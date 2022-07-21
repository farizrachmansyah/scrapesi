/* eslint-disable no-console */
/* eslint-disable require-await */
const pptr = require('puppeteer')

class Jobs {
	static withBrowser = async fn => {
		const browser = await pptr.launch({
			headless: false,
			defaultViewport: null,
			userDataDir: './scrape-cache',
			// args documentation (https://peter.sh/experiments/chromium-command-line-switches/)
			args: [
				'--autoplay-policy=user-gesture-required',
				'--disable-background-networking',
				'--disable-background-timer-throttling',
				'--disable-backgrounding-occluded-windows',
				'--disable-breakpad',
				'--disable-client-side-phishing-detection',
				'--disable-component-update',
				'--disable-default-apps',
				'--disable-dev-shm-usage',
				'--disable-domain-reliability',
				'--disable-extensions',
				'--disable-features=AudioServiceOutOfProcess',
				'--disable-hang-monitor',
				'--disable-ipc-flooding-protection',
				'--disable-notifications',
				'--disable-offer-store-unmasked-wallet-cards',
				'--disable-popup-blocking',
				'--disable-print-preview',
				'--disable-prompt-on-repost',
				'--disable-renderer-backgrounding',
				'--disable-setuid-sandbox',
				'--disable-speech-api',
				'--disable-sync',
				'--hide-scrollbars',
				'--ignore-gpu-blacklist',
				'--metrics-recording-only',
				'--mute-audio',
				'--no-default-browser-check',
				'--no-first-run',
				'--no-pings',
				'--no-sandbox',
				'--no-zygote',
				'--password-store=basic',
				'--use-gl=swiftshader',
				'--use-mock-keychain'
			]
		})
		try {
			return await fn(browser)
		} catch (err) {
			console.error(err)
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
			console.error(err)
		} finally {
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
							console.error(err)
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
					console.error(err)
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
					console.error(err)
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
