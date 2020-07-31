'use strict';
const svgCaptcha = require('svg-captcha');
const svgToDataURL = require('svg-to-dataurl');
/**
 * 生成验证码
 */
module.exports = {
	// 验证码
	captcha(param,captchaId) {
		const { type = 'svg', width = 150, height = 50 } = param || {};
		const svg = svgCaptcha.create({
			ignoreChars: "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
			width,
			height
		});
		const result = {
			captchaId,
			data: svg.data.replace(/\"/g, "'"),
		};
		// 文字变白
		const rpList = ['#111', '#222', '#333', '#444', '#555', '#666', '#777', '#888', '#999'];
		rpList.forEach(rp => {
			result.data = result.data.replace(new RegExp(rp, "gm"), '#fff');
		});
		if (type === 'base64') {
			result.data = svgToDataURL(result.data);
		}
		return { result, text: svg.text.toLowerCase() };
	}
}
