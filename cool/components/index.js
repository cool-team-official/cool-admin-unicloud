import Vue from "vue";

Vue.component("cl-editor-tinymce", () => import("./editor/tinymce/index.vue"));
Vue.component("cl-upload", () => import("./upload/index.vue"));
Vue.component("cl-upload-space", () => import("./upload/space.vue"));
Vue.component("cl-avatar", () => import("./avatar/index.vue"));
Vue.component("cl-menu-icons", () => import("./menu/icons.vue"));
Vue.component("cl-menu-tree", () => import("./menu/tree.vue"));
Vue.component("cl-menu-perms", () => import("./menu/perms.vue"));
Vue.component("cl-menu-file-path", () => import("./menu/file-path.vue"));
Vue.component("cl-role-tree", () => import("./role/tree.vue"));
Vue.component("cl-role-select", () => import("./role/select.vue"));
Vue.component("cl-dept-tree", () => import("./dept/tree.vue"));
Vue.component("cl-scroll", () => import("./scroll/index.vue"));
Vue.component("cl-context-menu", () => import("./context-menu/index.js"));
Vue.component("icon-svg", () => import("./icon-svg/index.vue"));
