<script>
export default {
	onLaunch: function () {
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show", uni.getStorageSync("token"));
		if (!uni.getStorageSync("token")) {
			uni.navigateTo({
				url: "/pages/login/index"
			});
		}
	},
	onHide: function () {
		console.log("App Hide");
	}
};
</script>

<style lang="scss">
@import "@/static/css/index.scss";
</style>
