<template>
  <div id="app" class="container">
    <div class="row" style="margin-bottom: 5.0rem;">
      <div class="twelve columns">
        <h3 style="margin-bottom: 0;">Rebanira</h3>
        <router-link v-if="$route.name !== 'lobby'" :to="{ name: 'lobby' }"
          >back to top</router-link
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style></style>
