import { BaseService, Service, Permission } from "@/cool";

@Service("sys/info")
export default class extends BaseService {
	@Permission("record")
	record() {
		return this.request({
			url: "/record"
		});
	}
}
