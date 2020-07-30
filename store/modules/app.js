import { app } from "@/config/env";

export default {
	state: {
		info: {
			name: "cool-admin"
		},
		conf: {
			...app
		}
	}
};
