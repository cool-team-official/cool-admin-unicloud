import Vue from "vue";

Vue.filter("default_avatar", function (url) {
	if (!url) {
		return require("@/static/icon/default-avatar.png");
	}

	return url;
});

Vue.filter("default_name", function (name) {
	if (!name) {
		return "未命名";
	}

	return name;
});
