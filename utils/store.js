import engine from "store/src/store-engine";
const storages = [require("store/storages/localStorage"), require("store/storages/cookieStorage")];
const plugins = [require("store/plugins/defaults"), require("store/plugins/expire")];
export default engine.createStore(storages, plugins);
