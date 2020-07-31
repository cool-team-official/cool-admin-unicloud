const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	publicPath: "/",
	lintOnSave: true,
	productionSourceMap: false,
	parallel: require("os").cpus().length > 1,

	devServer: {
		port: 8080,
		open: false,
		compress: false,
		overlay: {
			warnings: false,
			errors: true
		},

		proxy: {
			"/dev": {
				target: "http://192.168.199.211:7001",
				changeOrigin: true,
				pathRewrite: {
					"^/dev": ""
				}
			},

			"/pro": {
				target: "https://ai.cool-js.com",
				changeOrigin: true,
				pathRewrite: {
					"^/pro": "/api"
				}
			},

			"/nw": {
				target: "http://dev.cool-js.com",
				changeOrigin: true,
				pathRewrite: {
					"^/nw": ""
				}
			}
		}
	}
};
