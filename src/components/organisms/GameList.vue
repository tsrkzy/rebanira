<template>
  <div class="row">
    <div :key="g.id" v-for="(g, i) in gameList" class="twelve columns">
      <h6>
        <router-link :to="`/game/${g.id}`">{{ g.name }}</router-link>
      </h6>
      <p v-if="g.resolved">解決</p>
      <p>{{ g.situation }}</p>
      <p>
        <span>{{ g.author }}</span
        >&nbsp;-&nbsp;<span>{{ g.date }}</span>
      </p>
      <hr v-if="i !== gameList.length - 1" />
    </div>
  </div>
</template>

<script>
export default {
  name: "GameList",
  props: {
    gameList: { type: Array, require: true }
  }
};
</script>

<style scoped></style>
