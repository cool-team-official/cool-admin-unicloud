export default function (options) {
	return new Promise((resolve, reject) => {
		if (!options.method || options.method == "GET") {
			options.data = options.params;
		}

		uni.request({
			url: options.url,
			...options,
			header: {
				Authorization:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbIjEiXSwidXNlcklkIjoiMSIsInBhc3N3b3JkVmVyc2lvbiI6MSwiaWF0IjoxNTk2MTIzOTc5LCJleHAiOjE1OTY3Mjg3Nzl9.Sy6F1xsp5ND0i7Cm5SNKYzEpAg51dzKQspMoiaj6zZI"
			},
			success: (res) => {
				resolve(res.data.data);
			}
		});
	});
}
