export default function (options) {
	return new Promise((resolve, reject) => {
		const token = uni.getStorageSync("token") || "";

		// if (!options.method || options.method == "GET") {
		// 	options.data = options.params;
		// }

		// uni.request({
		// 	...options,
		// 	header: {
		// 		Authorization: token
		// 	}
		// }).then((res) => {
		// 	const { code, data, message } = res[1].data;

		// 	if (code === 1000) {
		// 		resolve(data);
		// 	} else {
		// 		reject(message);
		// 	}
		// });

		if (options.method == "POST") {
			options.params = options.data;
		}

		console.log(options.url, options.params);

		uniCloud
			.callFunction({
				name: "cool",
				data: { ...options, token }
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
