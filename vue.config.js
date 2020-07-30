const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	publicPath: "/",
	lintOnSave: true,
	productionSourceMap: false,
	parallel: require("os").cpus().length > 1,

	css: {
		extract: isProduction,
		sourceMap: false,
		loaderOptions: {
			sass: {
				prependData: `@import "@/static/css/common.scss";`
			}
		}
	},

	devServer: {
		port: 10000,
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
	},

	chainWebpack: (config) => {
		// svg
		config.module.rule("svg").uses.clear();

		config.module
			.rule("svg-sprite-loader")
			.test(/.svg$/)
			.exclude.add(/node_modules/)
			.end()
			.use("svg-sprite-loader")
			.loader("svg-sprite-loader")
			.options({
				symbolId: "[name]"
			});

		// 去掉元素之间空格
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap((options) => {
				options.compilerOptions.preserveWhitespace = true;
				return options;
			})
			.end();

		if (isProduction) {
			config.performance.set("hints", false);

			config.optimization.splitChunks({
				chunks: "all",
				cacheGroups: {
					libs: {
						name: "chunk-libs",
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: "initial"
					},
					commons: {
						name: "chunk-cool",
						test: resolve("src/cool"),
						minChunks: 3,
						priority: 5,
						reuseExistingChunk: true
					}
				}
			});
		}
	}
};
