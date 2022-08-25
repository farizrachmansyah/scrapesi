/* eslint-disable no-console */
/* eslint-disable require-await */
const pptr = require('puppeteer')

// Sources
// parallelization tricks (https://advancedweb.hu/how-to-speed-up-puppeteer-scraping-with-parallelization/)
// official troubleshoot page (https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md)
// args documentation (https://peter.sh/experiments/chromium-command-line-switches/)
// puppeteer with minimal settings (https://www.bannerbear.com/blog/ways-to-speed-up-puppeteer-screenshots/)
class Jobs {
	static withBrowser = async fn => {
		const browser = await pptr.launch({
			defaultViewport: null,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		})

		try {
			return await fn(browser)
		} catch (err) {
			console.log('error at browser: ', err)
		} finally {
			await browser.close()
		}
	}

	static withPage = browser => async fn => {
		const page = await browser.newPage()

		// set request only for document (biar lebih cepet loadnya)
		await page.setRequestInterception(true)
		page.on('request', request => {
			request.resourceType() === 'document'
				? request.continue()
				: request.abort()
		})

		try {
			return await fn(page)
		} catch (err) {
			console.log('error at page: ', err)
		} finally {
			await page.waitForTimeout(1000)
		}
	}

	static async scrapeJob(query, loc) {
		const finalResults = []
		const results = await this.withBrowser(async browser => {
			return Promise.all([
				this.withPage(browser)(async page => {
					let jobs = []
					try {
						jobs = await this.scrapeFromIndeed(query, loc, page)
					} catch (err) {
						console.log('error indeed scrape func: ', err)
					}
					return jobs
				}),
				this.withPage(browser)(async page => {
					let jobs = []
					try {
						jobs = await this.scrapeFromJobsid(query, loc, page)
					} catch (err) {
						console.log('error jobsid scrape func: ', err)
					}
					return jobs
				})
			])
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
			let isResults = false
			let jobsPerPage = []

			try {
				await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
				isResults = await page.evaluate(() => {
					const container = document.querySelector('.jobsearch-ResultsList')
					return !!container
				})
			} catch (err) {
				console.log('indeed dom load error: ', err)
				break
			}

			if (isResults) {
				try {
					jobsPerPage = await page.$$eval(
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
					allJobs = [...allJobs, ...jobsPerPage]

					// find next btn to replace baseUrl value
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
				} catch (err) {
					console.log('error at indeed jobsPerPage: ', err)
					break
				}
			} else {
				break
			}
		}

		return allJobs
	}

	static async scrapeFromJobsid(query, loc, page) {
		let allJobs = []
		let baseUrl

		// atur lokasi jakarta
		const modifiedLoc = loc
			? loc.toLowerCase() === 'jakarta'
				? 'dki-jakarta'
				: loc
			: loc

		// atur base url
		if (query.length && loc.length) {
			baseUrl = `https://www.jobs.id/lowongan-kerja-${query}-di-${modifiedLoc}?kata-kunci=${query}`
		} else if (query.length) {
			baseUrl = `https://www.jobs.id/lowongan-kerja-${query}?kata-kunci=${query}`
		} else {
			baseUrl = `https://www.jobs.id/lowongan-kerja-di-${modifiedLoc}`
		}

		while (true) {
			let isResults = false
			let jobsPerPage = []

			try {
				await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
				isResults = await page.evaluate(() => {
					const container = document.querySelector('#no-jobs-panel.hidden')
					return !!container
				})
			} catch (err) {
				console.log('jobsid dom load error: ', err)
				break
			}

			if (isResults) {
				try {
					jobsPerPage = await page.$$eval('#job-ads-container > div', cards => {
						return cards.map(card => ({
							jobTitle: card.querySelector('h3 > a.bold').textContent,
							companyName: card.querySelector(
								'div:nth-child(1) > div:nth-child(2) > p:nth-child(2) > *:nth-child(1)'
							).textContent,
							jobLocation: card
								.querySelector(
									'div:nth-child(1) > div:nth-child(2) > p:nth-child(2) > span.location'
								)
								.textContent.split(' ')[0],
							time: card.querySelector(
								'div:nth-child(1) > div:nth-child(2) > p.text-muted'
							).textContent,
							url: card.querySelector('h3 > a.bold').getAttribute('href')
						}))
					})
					allJobs = [...allJobs, ...jobsPerPage]

					try {
						baseUrl = await page.$$eval(
							'#pagination-container > ul > li.hidden-xs > a',
							els => {
								if (els.length > 1) {
									return els[1].href
								} else if (els[0].rel === 'next') {
									return els[0].href
								} else {
									throw new Error('next button not found')
								}
							}
						)
					} catch {
						break
					}
				} catch (err) {
					console.log('error at jobs.id jobsPerPage: ', err)
					break
				}
			} else {
				break
			}
		}

		return allJobs
	}
}

export default Jobs
