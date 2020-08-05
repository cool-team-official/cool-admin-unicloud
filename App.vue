<script>
export default {
	onLaunch: function () {
		console.log("App Launch", uni.getStorageSync("token"));
		if (!uni.getStorageSync("token")) {
			if (this.$route.path != "/pages/login/index") {
				uni.navigateTo({
					url: "/pages/login/index"
				});
			}
		}
	},
	onShow: function () {
		console.log("App Show");
	},
	onHide: function () {
		console.log("App Hide");
	}
};
</script>

<style lang="scss">
@import "@/static/css/index.scss";
</style>
