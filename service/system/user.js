import { BaseService, Service, Permission } from "@/cool";

@Service("sys/user")
export default class extends BaseService {
	@Permission("move")
	move(data) {
		return this.request({
			url: "/move",
			method: "POST",
			data
		});
	}
}
