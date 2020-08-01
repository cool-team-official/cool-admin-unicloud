export default function (options) {
	return new Promise((resolve, reject) => {
		const token =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbIjEiXSwidXNlcklkIjoiMSIsInBhc3N3b3JkVmVyc2lvbiI6MSwiaWF0IjoxNTk1NzcyMTg3LCJleHAiOjE1OTYzNzY5ODd9.O0pUalttg5NctMP8xQCdhYr9o2EgQPEA-rt6ERzuDbk";

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
