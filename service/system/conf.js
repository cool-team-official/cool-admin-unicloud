import { BaseService, Service, Permission } from "@/cool";

@Service("sys/conf")
export default class extends BaseService {
	@Permission("all")
	all() {
		return this.request({
			url: "/all"
		});
	}

	@Permission("save")
	save(data) {
		return this.request({
			url: "/save",
			method: "POST",
			data
		});
	}
}
