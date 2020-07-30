import { BaseService, Service, Permission } from "@/cool";

@Service("sys/department")
export default class extends BaseService {
	@Permission("order")
	order(data) {
		return this.request({
			url: "/order",
			method: "POST",
			data
		});
	}
}
