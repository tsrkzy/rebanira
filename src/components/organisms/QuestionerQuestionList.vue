<template>
  <div style="margin-top: 12px;">
    <div class="twelve columns scroll-holder">
      <div v-for="(q, i) in questions" :key="i">
        <question-row
          :question="q"
          :partition="i !== questions.length - 1"
        ></question-row>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionRow from "./QuestionRow";
export default {
  name: "QuestionerQuestionList",
  components: { QuestionRow },
  props: {
    questions: { type: Array, require: true }
  }
};
</script>

<style scoped lang="scss">
div.scroll-holder {
  max-height: 400px;
  overflow-y: scroll;
  padding: 1rem;
  border-bottom: 1px solid lightgray;
}

input[type="radio"] {
  margin-right: 1rem;
  margin-bottom: 0;
}
</style>
