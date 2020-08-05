export function uploadFile({ filePath, cloudPath }) {
	return new Promise((resolve, reject) => {
		uniCloud.uploadFile({
			filePath,
			cloudPath,
			success: ({ fileID }) => {
				if (fileID.includes("cloud://")) {
					fileID = fileID.replace("cloud://tdev-9c1feb.", "");
					const [path, name] = fileID.split("/");
					resolve("https://" + path + ".tcb.qcloud.la/" + name);
				}

				if (fileID) {
					return resolve(fileID);
				}
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}
