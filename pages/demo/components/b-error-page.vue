<template>
	<div class="scope">
		<div class="h">
			<span>error-page</span>
			错误页
		</div>

		<div class="c">
			<router-link to="/pages/error-page/403">403</router-link>
			<router-link to="/pages/error-page/404">404</router-link>
			<router-link to="/pages/error-page/500">500</router-link>
			<router-link to="/pages/error-page/503">503</router-link>
		</div>

		<div class="f">
			<span class="date">2019/10/25</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.scope {
	.c {
		a {
			margin-right: 20px;
		}
	}
}
</style>
