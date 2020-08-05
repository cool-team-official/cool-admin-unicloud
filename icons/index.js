import { iconfontUrl } from "@/config/env";

function iconfont(url) {
	const link = document.createElement("link");
	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = url;
	document.getElementsByTagName("head")[0].appendChild(link);
}

if (iconfontUrl) {
	iconfont(iconfontUrl);
}
