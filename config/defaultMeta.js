export default [
	{ charset: 'utf-8' },
	{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
	{
		hid: 'description',
		name: 'description',
		content:
			'A free automated job vacancies scraping converter tools. We help you to collect your targeted job vacancies and convert them into spreadsheet documents easily!'
	},
	{
		name: 'theme-color',
		content: '#ffffff'
	},
	{
		name: 'format-detection',
		content: 'telephone=no'
	},
	{
		hid: 'og:url',
		property: 'og:url',
		content: '/'
	},
	{
		hid: 'og:title',
		property: 'og:title',
		content: 'Scrapesi - Collect, Convert, and Learn'
	},
	{
		hid: 'og:site_name',
		property: 'og:site_name',
		content: 'Scrapesi - Collect, Convert, and Learn'
	},
	{
		hid: 'og:description',
		property: 'og:description',
		content:
			'A free automated job vacancies scraping converter tools. We help you to collect your targeted job vacancies and convert them into spreadsheet documents easily!'
	},
	{
		hid: 'og:image',
		property: 'og:image',
		content: '/favicon.png'
	},
	{
		hid: 'og:type',
		property: 'og:type',
		content: 'website'
	},
	{
		hid: 'fb:app_id',
		property: 'fb:app_id',
		content: ''
	},

	{
		hid: 'twitter:card',
		name: 'twitter:card',
		content: ''
	},
	{
		hid: 'twitter:site',
		name: 'twitter:site',
		content: '/'
	},
	{
		hid: 'twitter:description',
		name: 'twitter:description',
		content: process.env.npm_package_description || ''
	},
	{
		hid: 'twitter:title',
		name: 'twitter:title',
		content: process.env.npm_package_name || ''
	},
	{
		hid: 'twitter:image',
		name: 'twitter:image',
		content: '/icon.png'
	},
	{
		hid: 'keywords',
		name: 'keywords',
		content: ''
	}
]
