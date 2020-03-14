<template>
  <div style="margin-top: 12px;">
    <div class="twelve columns scroll-holder">
      <ul v-for="(q, i) in questions" :key="i" :style="questionStyles(q)">
        <li>
          {{ q.text }}&nbsp;<em>-&nbsp;{{ q.date }},&nbsp;{{ q.author }}</em>
        </li>
        <li>
          <ul>
            <li>
              <span
                v-if="q.isTrue()"
                style="color: steelblue; font-weight: bold;"
                >Yes.&nbsp;</span
              >
              <span
                v-else-if="q.isFalse()"
                style="color: darksalmon; font-weight: bold;"
                >No.&nbsp;</span
              >
              <span
                v-else-if="q.isRejected()"
                style="color: gray; font-weight: bold;"
                >回答不可.&nbsp;</span
              >
              <span
                v-else-if="q.isUndefined()"
                style="color: gray; font-weight: bold;"
                >回答待ち.&nbsp;</span
              >
              <span v-if="q.reply">{{ q.reply.text }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionerQuestionList",
  props: {
    questions: { type: Array, require: true }
  },
  methods: {
    questionStyles(q) {
      const styles = {};
      q.hidden && (styles.display = "none");
      return styles;
    }
  }
};
</script>

<style scoped></style>
