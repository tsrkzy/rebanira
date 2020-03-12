import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* sass (font+global css) */
import "./scss/init.scss";

Vue.config.productionTip = false;

import { initFirebase } from "./firebase/firebase";
initFirebase();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
