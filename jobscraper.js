const pptr = require('puppeteer')
let browser, page

class Jobs {
	static async initPage() {
		browser = await pptr.launch()
		page = await browser.newPage()
	}

	static async scrapeJob(query, loc) {
		let url = `https://id.indeed.com/jobs?q=${query}&l=${loc}`
		await this.initPage()

		const allJobs = []
		while (true) {
			await page.goto(url)
			// get all jobcard perpage
			const jobPerPage = await page.$$eval(
				'#mosaic-provider-jobcards .tapItem.result',
				cards => {
					return cards.map(card => ({
						jobTitle: card.querySelector('h2.jobTitle > a > span').title,
						companyName: card.querySelector('.companyInfo .companyName')
							.textContent,
						jobLocation: card.querySelector('.companyLocation').textContent,
						time: card.querySelector('.underShelfFooter .date').childNodes[1]
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
