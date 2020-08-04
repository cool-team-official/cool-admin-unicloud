<template>
    <editor
        v-model="value"
        :init="init"
    ></editor>
</template>

<script>
import tinymce from "tinymce";
import Editor from "@tinymce/tinymce-vue";

import "tinymce/themes/silver";
import "tinymce/plugins/image";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/lists";
import "tinymce/plugins/wordcount";
import "tinymce/icons/default/icons";

export default {
	data() {
		return {
			value: " ",
			init: {
				language_url: "/tinymce/langs/zh_CN.js",
				language: "zh_CN",
				skin_url: "/tinymce/skins/ui/oxide",
				height: 300,
				branding: false,
				menubar: false,
				statusbar: false,
				paste_data_images: true,
				toolbar:
					"undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat",
				plugins: "lists image media table wordcount"
			}
		};
	},
	components: { Editor },
	mounted() {
		tinymce.init({});
	}
};
</script>