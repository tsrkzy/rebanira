import Vue from "vue";
import Router from "vue-router";
import Lobby from "./components/Lobby";

Vue.use(Router);

/**
 * @SEE https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js
 */
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Lobby
    }
  ]
});

export default router;
