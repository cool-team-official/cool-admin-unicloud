<template>
	<div class="error-page">
		<h1 class="code">{{ code }}</h1>
		<p class="desc">{{ desc }}</p>

		<div class="router">
			<el-select size="medium" filterable prefix-icon="el-icon-search" v-model="url">
				<el-option v-for="(item, index) in routes" :key="index" :value="item.path">
					<span style="float: left;">{{ item.name }}</span>
					<span style="float: right;">{{ item.path }}</span>
				</el-option>
			</el-select>

			<el-button round @click="navTo">跳转</el-button>
		</div>

		<div class="link">
			<el-link class="to-home" @click="home">回到首页</el-link>

			<el-link class="to-back" @click="back">返回上一页</el-link>

			<el-link class="to-login" @click="login">重新登录</el-link>
		</div>

		<p class="copyright">Copyright © cool-admin 2020</p>
	</div>
</template>

<script>
	import {
		mapGetters
	} from "vuex";

	export default {
		props: {
			code: Number,
			desc: String
		},

		data() {
			return {
				url: ""
			};
		},

		computed: {
			...mapGetters(["routes"])
		},

		methods: {
			navTo() {
				this.$router.push(this.url);
			},

			back() {
				history.back();
			},

			home() {
				this.$router.push("/");
			},

			login() {
				this.$store.dispatch("userLogout");

				setTimeout(() => {
					this.$router.push("/login");
				}, 30);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.error-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		height: 100vh;

		.code {
			font-size: 120px;
			font-weight: normal;
			color: #6c757d;
			font-family: "Segoe UI";
		}

		.desc {
			font-size: 16px;
			font-weight: 400;
			color: #34395e;
			margin-top: 30px;
		}

		.router {
			margin-top: 50px;
			display: flex;

			.el-select {
				font-size: 14px;
				width: 350px;
			}

			.el-button {
				margin-left: 15px;
				background-color: $uni-color-main;
				border-color: $uni-color-main;
				color: #fff;
				padding: 0 30px;
				letter-spacing: 1px;
				height: 36px;
				line-height: 36px;
			}
		}

		.link {
			margin-top: 40px;

			a {
				color: $uni-color-main;
				font-weight: 500;
				transition: all 0.5s;
				-webkit-transition: all 0.5s;
				cursor: pointer;
				font-size: 14px;
				margin: 0 15px;
				padding-bottom: 2px;

				&::after {
					border-color: $uni-color-main;
				}
			}
		}

		.copyright {
			color: #6c757d;
			margin-top: 90px;
			font-size: 14px;
		}
	}
</style>
