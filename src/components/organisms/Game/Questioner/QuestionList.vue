<template>
  <div>
    <div class="twelve columns scroll-holder">
      <label>
        <input type="checkbox" v-model="reverse" />
        <span>新しい順で表示する</span>
      </label>
      <div v-for="(q, i) in questionList" :key="q.id">
        <question-row
          :question="q"
          :partition="i !== questionList.length - 1"
        ></question-row>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionRow from "./QuestionRow";
export default {
  name: "QuestionList",
  components: { QuestionRow },
  props: {
    questions: { type: Array, require: true }
  },
  computed: {
    questionList() {
      return this.reverse ? this.questions.slice().reverse() : this.questions;
    }
  },
  data() {
    return {
      reverse: true
    };
  }
};
</script>

<style scoped lang="scss">
div.scroll-holder {
  max-height: 400px;
  overflow-y: scroll;
  border-bottom: 1px solid lightgray;
}

input[type="radio"] {
  margin-right: 1rem;
  margin-bottom: 0;
}
</style>
