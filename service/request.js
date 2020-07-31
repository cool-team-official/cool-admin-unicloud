export default function (options) {
	return new Promise((resolve, reject) => {
		if (options.method == "POST") {
			options.params = options.data;
		}

		uniCloud
			.callFunction({
				name: "cool",
				data: { ...options, token: uni.getStorageSync("token") || "" }
			})
			.then((res) => {
				const { code, data, message } = res.result;

				if (code === 1000) {
					resolve(data);
				} else {
					reject(message);
				}
			});
	});
}
