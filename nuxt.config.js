import defaultMeta from './config/defaultMeta'
import sitemapConfig from './config/sitemapConfig'

/*
 ** Axios Instance
 */
const AxiosInstance = {
	baseURL: process.env.BASE_URL,
	withCredentials: false,
	retry: true,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
}

export default {
	target: 'server',
	// Duplicate .env
	env: {
		BASE_URL: process.env.BASE_URL,
		ANALYTICS_URL: process.env.ANALYTICS_URL
	},
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		title: 'Scrapesi - Collect, Convert, and Learn',
		htmlAttrs: {
			lang: 'en'
		},
		meta: defaultMeta,
		link: [
			{ rel: 'apple-touch-icon', href: '/favicon.png' },
			{ rel: 'icon', type: 'image/png', href: '/favicon.png' }
		]
	},

	render: {
		bundleRenderer: {
			shouldPreload: (file, type) => {
				return ['script', 'style', 'font'].includes(type)
			}
		}
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: ['~/assets/scss/main.scss'],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: './plugins/vue-slick-carousel.js' },
		{ src: '~/plugins/helpers.js' },
		{ src: '~/plugins/vuelidate' },
		{ src: '~/plugins/vue-json-excel.js' }
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/stylelint-module'],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'@nuxtjs/style-resources',
		['nuxt-lazy-load', { directiveOnly: true }],
		'@nuxtjs/sitemap'
	],
	sitemap: sitemapConfig,

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {
		proxy: true,
		AxiosInstance
	},

	privateRuntimeConfig: {
		axios: {
			baseURL: process.env.BASE_URL
		}
	},

	proxy: {
		'/fakerapi': {
			target: process.env.ANALYTICS_URL,
			pathRewrite: { '^/fakerapi/': '' },
			changeOrigin: true,
			onProxyReq(request) {
				request.setHeader('origin', process.env.ANALYTICS_URL)
			}
		}
	},

	// AUTH
	auth: {
		strategies: {
			local: {
				endpoints: {
					login: { url: '/auth/login', method: 'post' },
					logout: { url: '/auth/logout', method: 'post' },
					user: {
						url: '/current-user/profile',
						method: 'get',
						propertyName: false
					}
				},
				tokenType: 'Bearer'
			}
		}
	},

	styleResources: {
		scss: ['./assets/scss/partials/_variables.scss']
	},

	router: {
		middleware: ['redirection']
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		extend(config, { isServer, isClient }) {
			config.externals = config.externals || {}
			if (!isServer) {
				config.node = {
					fs: 'empty'
				}
				if (Array.isArray(config.externals)) {
					config.externals.push({
						puppeteer: require('puppeteer')
					})
				} else {
					config.externals.puppeteer = require('puppeteer')
				}
			}
			config.output.globalObject = 'this'
			return config
		},
		postcss: {
			preset: {
				autoprefixer: {
					overrideBrowserslist: ['last 2 versions']
				}
			}
		},
		optimizecss: true,
		optimization: {
			splitChunks: {
				minSize: 20000,
				maxSize: 500000
			}
		}
	}
}
