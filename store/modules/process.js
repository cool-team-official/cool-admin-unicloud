export default {
	state: {
		list: [
			{
				label: "首页",
				value: "/",
				active: true
			}
		]
	},
	mutations: {
		ADD_PROCESS(state, item) {
			const index = state.list.findIndex(
				(e) => e.value.split("?")[0] === item.value.split("?")[0]
			);

			state.list.map((e) => {
				e.active = e.value == item.value;
			});

			if (index < 0) {
				if (item.value == "/") {
					item.label = "首页";
				}

				if (item.label) {
					state.list.push({
						...item,
						active: true
					});
				}
			} else {
				state.list[index].active = true;
				state.list[index].label = item.label;
				state.list[index].value = item.value;
			}
		},

		DEL_PROCESS(state, index) {
			state.list.splice(index, 1);
		},

		SET_PROCESS(state, list) {
			state.list = list;
		},

		RESET_PROCESS(state) {
			state.list = [
				{
					label: "首页",
					value: "/",
					active: true
				}
			];
		}
	}
};
