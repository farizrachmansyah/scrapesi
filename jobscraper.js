const pptr = require('puppeteer')
let browser, page

class Jobs {
	static async initPage() {
		browser = await pptr.launch({
			headless: false
			// args: [
			// 	'--no-sandbox',
			// 	'--disable-setuid-sandbox',
			// 	'--disable-dev-shm-usage',
			// 	'--disable-accelerated-2d-canvas',
			// 	'--no-first-run',
			// 	'--no-zygote',
			// 	'--single-process', // <- this one doesn't works in Windows
			// 	'--disable-gpu'
			// ]
		})
		page = await browser.newPage()
	}

	static async scrapeJob(query, loc) {
		await this.initPage()
		let url = `https://id.indeed.com/jobs?q=${query}&l=${loc}`
		const allJobs = []

		while (true) {
			await page.goto(url, { waitUntil: 'networkidle2' })
			await page.waitForSelector('#mosaic-provider-jobcards').catch(() => {})

			// get all jobcard perpage
			const jobPerPage = await page.$$eval(
				'.jobsearch-ResultsList .tapItem.result .job_seen_beacon',
				cards => {
					return cards.map(card => ({
						jobTitle: card.querySelector('h2.jobTitle > a > span').title,
						companyName: card.querySelector('.companyInfo .companyName')
							.textContent,
						jobLocation: card.querySelector('.companyLocation').textContent,
						time: card.querySelector('.underShelfFooter .date').lastChild
							.nodeValue,
						url: `https://id.indeed.com${card
							.querySelector('h2.jobTitle > a')
							.getAttribute('href')}`
					}))
				}
			)
			allJobs.push(jobPerPage)

			try {
				const btnUrl = await page.$eval(
					'#resultsCol > nav > div > ul > li:last-child > a',
					el => {
						if (el.ariaLabel === 'Next' || el.ariaLabel === 'Berikutnya') {
							return el.href
						}
					}
				)
				url = btnUrl
			} catch {
				break
			}
		}

		await browser.close()
		return allJobs
	}
}
export default Jobs
