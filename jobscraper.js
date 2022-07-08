/* eslint-disable require-await */
const pptr = require('puppeteer')

class Jobs {
	static withBrowser = async fn => {
		const browser = await pptr.launch({
			headless: false,
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--disable-dev-shm-usage',
				'--disable-accelerated-2d-canvas',
				'--no-first-run',
				'--no-zygote',
				'--single-process', // <- this one doesn't works in Windows
				'--disable-gpu'
			]
		})
		try {
			return await fn(browser)
		} finally {
			await browser.close()
		}
	}

	static withPage = browser => async fn => {
		const page = await browser.newPage()
		try {
			return await fn(page)
		} finally {
			await page.close()
		}
	}

	static async scrapeJob(query, loc) {
		const targets = ['indeed', 'jobstreet']
		const finalResults = []

		const results = await this.withBrowser(async browser => {
			return Promise.all(
				targets.map(async target => {
					return this.withPage(browser)(async page => {
						if (target === 'indeed') {
							return await this.scrapeFromIndeed(query, loc, page)
						} else {
							return await this.scrapeFromJobStreet(query, loc, page)
						}
					})
				})
			)
		})

		if (results.length) {
			let concatResults = []

			// gabungin data dari tiap hasil scrape di masing2 sumber
			results.forEach(item => {
				concatResults = concatResults.concat(item)
			})

			// pecah data per 15
			while (concatResults.length)
				finalResults.push(concatResults.splice(0, 15))
		}

		return finalResults
	}

	static async scrapeFromIndeed(query, loc, page) {
		let baseUrl = `https://id.indeed.com/jobs?q=${query}&l=${loc}`
		let allJobs = []

		while (true) {
			await page.goto(baseUrl, { waitUntil: 'networkidle2' })
			await page.waitForSelector('#mosaic-provider-jobcards').catch(() => {})

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
			allJobs = [...allJobs, ...jobPerPage]

			try {
				baseUrl = await page.$eval(
					'#resultsCol > nav > div > ul > li:last-child > a',
					el => {
						if (el.ariaLabel === 'Next' || el.ariaLabel === 'Berikutnya') {
							return el.href
						}
					}
				)
			} catch {
				break
			}
		}

		return allJobs
	}

	static async scrapeFromJobStreet(query, loc, page) {
		const sanitizeLoc = loc.toLowerCase() === 'jakarta' ? 'jakarta raya' : loc
		let baseUrl = `https://www.jobstreet.co.id/id/job-search/${query}-jobs-in-${sanitizeLoc}/`
		let allJobs = []

		while (true) {
			await page.goto(baseUrl, { waitUntil: 'networkidle2' })
			await page.waitForSelector('#jobList').catch(() => {})

			const jobPerPage = await page.$$eval(
				'#jobList > div.sx2jih0.z0qC4_0 > div:nth-child(2) > div > div:nth-child(1) > div > div > article > div > div > div.sx2jih0.zcydq876.zcydq866.zcydq896.zcydq886.zcydq8n.zcydq856.zcydq8f6.zcydq8eu',
				cards => {
					return cards.map(card => ({
						jobTitle: card.querySelector('.sx2jih0 h1 > a > div > span')
							.textContent,
						companyName: '',
						jobLocation: '',
						time: '',
						url: ''
					}))
				}
			)
			allJobs = [...allJobs, ...jobPerPage]

			try {
				baseUrl = await page.$eval(
					'#jobList > div.sx2jih0.z0qC4_0 > div.sx2jih0.zcydq8bm.zcydq8p > div > a:nth-child(3)',
					el => {
						return el.href
					}
				)
			} catch {
				break
			}
		}

		return allJobs
	}
}

export default Jobs

// static async initPage() {
// 	browser = await pptr.launch({
// 		headless: false,
// 		args: [
// 			'--no-sandbox',
// 			'--disable-setuid-sandbox',
// 			'--disable-dev-shm-usage',
// 			'--disable-accelerated-2d-canvas',
// 			'--no-first-run',
// 			'--no-zygote',
// 			'--single-process', // <- this one doesn't works in Windows
// 			'--disable-gpu'
// 		]
// 	})
// 	page = await browser.newPage()
// }

// await this.initPage()
// let url = `https://id.indeed.com/jobs?q=${query}&l=${loc}`
// const allJobs = []

// while (true) {
// 	await page.goto(url, { waitUntil: 'networkidle2' })
// 	await page
// 		.waitForSelector('#mosaic-provider-jobcards')
// 		.catch(async () => {
// 			// kalo selectornya gaketemu berarti gaada hasil
// 			// close and return
// 			await browser.close()
// 			return allJobs
// 		})

// 	// get all jobcard perpage
// 	const jobPerPage = await page.$$eval(
// 		'.jobsearch-ResultsList .tapItem.result .job_seen_beacon',
// 		cards => {
// 			return cards.map(card => ({
// 				jobTitle: card.querySelector('h2.jobTitle > a > span').title,
// 				companyName: card.querySelector('.companyInfo .companyName')
// 					.textContent,
// 				jobLocation: card.querySelector('.companyLocation').textContent,
// 				time: card.querySelector('.underShelfFooter .date').lastChild
// 					.nodeValue,
// 				url: `https://id.indeed.com${card
// 					.querySelector('h2.jobTitle > a')
// 					.getAttribute('href')}`
// 			}))
// 		}
// 	)
// 	allJobs.push(jobPerPage)

// 	try {
// 		const btnUrl = await page.$eval(
// 			'#resultsCol > nav > div > ul > li:last-child > a',
// 			el => {
// 				if (el.ariaLabel === 'Next' || el.ariaLabel === 'Berikutnya') {
// 					return el.href
// 				}
// 			}
// 		)
// 		url = btnUrl
// 	} catch {
// 		break
// 	}
// }

// await browser.close()
// return allJobs
