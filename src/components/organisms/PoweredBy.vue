<template>
  <section>
    <p class="comment-out m-0" v-html="announceByHtml"></p>
    <p class="src-code m-0" v-html="poweredByHtml"></p>
  </section>
</template>

<script>
export default {
  name: "PoweredBy",
  computed: {
    announceByHtml() {
      return `/* 水平思考クイズ用オンラインセッション支援ツール */`;
    },
    poweredByHtml() {
      return `<span class="key1">this</span>.<span class="key2">isPoweredBy</span>({ script: [<a href="https://github.com/tsrkzy/rebanira" target="_blank">"tsrkzy"</a>], hosting: <a href="https://firebase.google.com/" target="_blank">"firebase"</a>, frameworks: [<a href="https://jp.vuejs.org/index.html" target="_blank">"vuejs"</a>, <a href="http://getskeleton.com/" target="_blank">"skeleton-css"</a>] });`;
    }
  }
};
</script>

<style scoped lang="scss"></style>
