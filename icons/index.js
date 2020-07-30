import { iconfontUrl } from "@/config/env";

function iconfont(url) {
	const link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
}

function svg() {
	const requireAll = (requireContext) => requireContext.keys().map(requireContext);
	const req = require.context("@/icons/svg/", false, /\.svg$/);
	requireAll(req);
}

if (iconfontUrl) {
	iconfont(iconfontUrl);
}

svg();

export const iconList = () => {
	const req = require.context("@/icons/svg/", false, /\.svg$/);

	return req
		.keys()
		.map(req)
		.map((e) => e.default.id)
		.filter((e) => e.includes("icon"))
		.sort();
};
