<script>
export default {
	onLaunch: function () {
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show");
		if (!uni.getStorageSync("token")) {
			if (this.$route.path != "/pages/login/index") {
				uni.navigateTo({
					url: "/pages/login/index"
				});
			}
		}

		// 路由导航
		this.$router.beforeEach((to, from, next) => {
			const item = this.$store.getters.routes.find((e) =>
				e.path.includes("?") ? e.path == to.fullPath : e.path == to.fullPath
			);

			if (item) {
				// 添加路由进程
				this.$store.commit("ADD_PROCESS", {
					label: item.name,
					value: item.path.includes("?") ? to.fullPath : to.path
				});
			}

			next();
		});
	},
	onHide: function () {
		console.log("App Hide");
	}
};
</script>

<style lang="scss">
@import "@/static/css/index.scss";
</style>
