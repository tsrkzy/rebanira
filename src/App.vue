<template>
  <div id="app" class="container">
    <div class="row" style="margin-bottom: 5.0rem;">
      <div class="twelve columns">
        <h3 class="mb-0">Rebanira</h3>
        <div class="pl-1" v-if="$route.name === 'lobby'">
          <powered-by></powered-by>
        </div>
        <div class="pl-1" v-else>
          <link-to-top></link-to-top>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import LinkToTop from "./components/organisms/LinkToTop";
import PoweredBy from "./components/organisms/PoweredBy";
export default {
  name: "App",
  components: { PoweredBy, LinkToTop }
};
</script>

<style></style>
