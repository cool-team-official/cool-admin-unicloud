<template>
	<cl-layout>
		<div class="home">
			<el-row :gutter="15">
				<el-col :span="12" :xl="6">
					<div class="card">
						<count-sales></count-sales>
					</div>
				</el-col>
				<el-col :span="12" :xl="6">
					<div class="card">
						<count-views></count-views>
					</div>
				</el-col>
				<el-col :span="12" :xl="6">
					<div class="card">
						<count-paid></count-paid>
					</div>
				</el-col>
				<el-col :span="12" :xl="6">
					<div class="card">
						<count-effect></count-effect>
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="15">
				<el-col :span="24" :xl="14">
					<div class="card">
						<tab-chart></tab-chart>
					</div>
				</el-col>
				<el-col :span="24" :xl="10">
					<div class="card">
						<sales-rank></sales-rank>
					</div>
				</el-col>
			</el-row>

			<el-row :gutter="15">
				<el-col :span="24" :xl="14">
					<div class="card card--last">
						<hot-search></hot-search>
					</div>
				</el-col>
				<el-col :span="24" :xl="10">
					<div class="card card--last">
						<category-ratio></category-ratio>
					</div>
				</el-col>
			</el-row>
		</div>
	</cl-layout>
</template>

<script>
	import CategoryRatio from "./components/category-ratio";
	import CountSales from "./components/count-sales";
	import CountViews from "./components/count-views";
	import CountPaid from "./components/count-paid";
	import CountEffect from "./components/count-effect";
	import TabChart from "./components/tab-chart";
	import SalesRank from "./components/sales-rank";
	import HotSearch from "./components/hot-search";

	export default {
		components: {
			CategoryRatio,
			CountSales,
			CountViews,
			CountPaid,
			CountEffect,
			TabChart,
			SalesRank,
			HotSearch
		},

		data() {
			return {};
		},

		methods: {}
	};
</script>

<style lang="scss" scoped>
	.home {
		overflow: hidden auto;

		.card {
			background-color: #fff;
			border-radius: 5px;
			margin-bottom: 15px;

			&--last {
				margin-bottom: 0;
			}
		}
	}
</style>
