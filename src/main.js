import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import myalert from "components/common/alert/index.js";
Vue.prototype.$myalert = myalert.install;

import myloading from "components/common/loading/index.js";
Vue.prototype.$myloading = myloading.install;


import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// // import Resource from "vue-resource";
// // Vue.use(Resource); //跨域
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
// Vue.use(mavonEditor)

import Print from "vue-print-nb";
Vue.use(Print); //注册
import { https } from "network/request";
// import Print from "@/plugins/print";
// Vue.use(Print); // 注册

Vue.use(ElementUI);
Vue.prototype.$https = https;
// Vue.prototype.$get = gets;
// Vue.prototype.$post = posts;
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

// Vue.config.keyCodes = {
//   enter: 114
// };



const _vue = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
export default _vue;
