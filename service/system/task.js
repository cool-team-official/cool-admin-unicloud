import { BaseService, Service, Permission } from "@/cool";

@Service("sys/task")
export default class extends BaseService {
	@Permission("stop")
	stop(data) {
		return this.request({
			url: "/stop",
			method: "POST",
			data
		});
	}

	@Permission("start")
	start(data) {
		return this.request({
			url: "/start",
			method: "POST",
			data
		});
	}

	@Permission("once")
	once(data) {
		return this.request({
			url: "/once",
			method: "POST",
			data
		});
	}

	@Permission("log")
	log(params) {
		return this.request({
			url: "/log",
			params
		});
	}
}
