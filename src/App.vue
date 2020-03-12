<template>
  <div id="app">
    <h1>レバニラ</h1>
    <span><router-link to="/game/3">出題3</router-link></span>
    <span><router-link to="/game/2">出題2</router-link></span>
    <span><router-link to="/game/1">出題1</router-link></span>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: "App",
    components: {}
  };
</script>

<style>
</style>
