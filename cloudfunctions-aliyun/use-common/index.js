// use-common/index.js
'use strict';
const {
	secret,
	getVersion
} = require('hello-common')
exports.main = async (event, context) => {
	let version = getVersion()
	console.log('版本', version)
	return {
		secret,
		version
	}
}
