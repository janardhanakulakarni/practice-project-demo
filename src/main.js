import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store/store";
import "./assets/scss/variables.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  el: "#app",
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
