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
			headless: true,
			defaultViewport: null,
			ignoreDefaultArgs: ['--disable-extensions'],
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=egl']
		})
		try {
			return await fn(browser)
		} catch (err) {
			console.log(err)
		} finally {
			await browser.close()
		}
	}

	static withPage = browser => async fn => {
		const page = await browser.newPage()

		// disable image request (biar lebih cepet loadnya)
		await page.setRequestInterception(true)
		page.on('request', request => {
			request.resourceType() === 'image' ? request.abort() : request.continue()
		})
		try {
			return await fn(page)
		} catch (err) {
			console.log(err)
		} finally {
			await page.waitForTimeout(2000)
			await page.close()
		}
	}

	static async scrapeJob(query, loc) {
		const targets = ['indeed', 'jobsid']
		const finalResults = []

		const results = await this.withBrowser(async browser => {
			return Promise.all(
				targets.map(async target => {
					return this.withPage(browser)(async page => {
						try {
							if (target === 'indeed') {
								return await this.scrapeFromIndeed(query, loc, page)
							} else {
								return await this.scrapeFromJobsid(query, loc, page)
							}
						} catch (err) {
							console.log(err)
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
			await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
			await page.waitForSelector('#mosaic-provider-jobcards').catch(() => {
				return allJobs
			})

			const jobsPerPage = await page
				.$$eval(
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
				.catch(err => {
					console.log(err)
				})
			allJobs = [...allJobs, ...jobsPerPage]

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

	static async scrapeFromJobsid(query, loc, page) {
		const modifiedLoc = loc.toLowerCase() === 'jakarta' ? 'dki-jakarta' : loc
		let baseUrl = `https://www.jobs.id/lowongan-kerja-${query}-di-${modifiedLoc}?kata-kunci=${query}`
		let allJobs = []
		let pageCount = 1

		while (true) {
			await page.goto(baseUrl, { waitUntil: 'domcontentloaded' })
			await page.waitForSelector('#jobs-panel').catch(() => {
				return allJobs
			})

			const jobsPerPage = await page
				.$$eval('#job-ads-container > div', cards => {
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
						// companyName: ''
					}))
				})
				.catch(err => {
					console.log(err)
				})
			allJobs = [...allJobs, ...jobsPerPage]

			try {
				if (pageCount === 1) {
					baseUrl = await page.$eval(
						'#pagination-container > ul > li:nth-child(5) > a',
						el => {
							return el.href
						}
					)
				} else {
					baseUrl = await page.$eval(
						'#pagination-container > ul > li:nth-child(7) > a',
						el => {
							return el.href
						}
					)
				}
			} catch {
				break
			}

			pageCount++
		}

		return allJobs
	}
}

export default Jobs
