<template>
	<tinymce-vue v-model="content" api-key="your-api-key" :init="init"></tinymce-vue>
</template>

<script>
import TinymceVue from "@tinymce/tinymce-vue";

export default {
	props: {
		value: null,
		options: Object
	},

	components: { TinymceVue },

	data() {
		return {
			content: "",
			init: {
				branding: false,
				menubar: false,
				statusbar: false,
				paste_data_images: true,
				toolbar:
					"undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat",
				plugins: "lists image media table wordcount",
				...this.options
			}
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.content = val;
			}
		},

		content(val) {
			this.$emit("input", val);
		}
	}
};
</script>
