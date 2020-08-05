export default function (options) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token") || "";

		if (options.method == "POST") {
			options.params = options.data;
		}

		console.log(options.url, options.params);

		uniCloud
			.callFunction({
				name: "cool",
				data: { ...options, token, data: undefined, method: undefined }
			})
			.then((res) => {
				const { code, data, message } = res.result;

				if (code === 1000) {
					resolve(data);
				} else {
					reject(message);
				}

				switch (code) {
					// 成功
					case 1000:
						resolve(data);
						break;
					// 无权限
					case 1002:
						location.href = "#/pages/login/index";
						break;
					// 失败
					default:
						reject(message);
				}
			});
	});
}
