import store from "@/store/index";

function change(el, binding) {
	el.style.display = checkPerm(binding.value) ? el.getAttribute("_display") : "none";
}

function parse(value) {
	const permission = store.state.menu.permission;

	if (typeof value == "string") {
		return value ? permission.some((e) => e.includes(value.replace(/\s/g, ""))) : false;
	} else {
		return Boolean(value);
	}
}

export const PermissionDirective = {
	install(Vue) {
		Vue.directive("permission", {
			inserted(el, binding) {
				el.setAttribute("_display", el.style.display || "");

				change(el, binding);
			},
			update: change
		});
	}
};

export const checkPerm = (value) => {
	if (!value) {
		return false;
	}

	if (Object.prototype.toString.call(value) === "[object Object]") {
		if (value.or) {
			return value.or.some(parse);
		}

		if (value.and) {
			return value.and.some((e) => !parse(e)) ? false : true;
		}
	}

	return parse(value);
};
