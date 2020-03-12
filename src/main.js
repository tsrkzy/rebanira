import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import {initFirebase} from "./firebase/firebase";
initFirebase();

new Vue({
  render: h => h(App),
}).$mount("#app");
