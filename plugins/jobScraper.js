const pptr = require('puppeteer')

export default {
	methods: {
		async scrapeData(query, loc) {
			let url = `https://id.indeed.com/jobs?q=${query}&l=${loc}`
			const allJobs = []

			while (true) {
				const jobPerPage = await Scraping.scrapeJob(url)
				allJobs.push(jobPerPage)

				try {
					url = await Scraping.scrapeNextBtn(url)
				} catch {
					break
				}
			}

			// eslint-disable-next-line no-console
			console.log(allJobs)
			return allJobs
		}
	}
}

export const Scraping = {
	async scrapeJob(url) {
		const browser = await pptr.launch()
		const page = await browser.newPage()
		await page.goto(url)

		// get all jobcard perpage
		const jobPerPage = await page.$$eval(
			'#mosaic-provider-jobcards a.tapItem',
			cards => {
				return cards.map(card => ({
					jobTitle: card.querySelector('h2.jobTitle > span').title,
					companyName: card.querySelector('.companyName').textContent,
					url: `https://id.indeed.com/${card.getAttribute('href')}`
				}))
			}
		)

		await browser.close()
		return jobPerPage
	},
	async scrapeNextBtn(url) {
		const browser = await pptr.launch()
		const page = await browser.newPage()
		await page.goto(url)

		const btnUrl = await page.$eval(
			'#resultsCol > nav > div > ul > li:nth-child(7) > a',
			el => {
				if (el.ariaLabel === 'Next') {
					return el.href
				}
			}
		)

		await browser.close()
		return btnUrl
	}
}
