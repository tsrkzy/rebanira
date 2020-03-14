<template>
  <div class="twelve columns">
    <h6>質問への回答</h6>
    <label>
      <input type="checkbox" v-model="reverse" />
      <span>新しい順で表示する</span>
    </label>
    <div v-for="q in questionList" :key="q.id" class="twelve columns">
      <reply-editor
        :question="q"
        @update-question="questionUpdateHandler"
      ></reply-editor>
    </div>
  </div>
</template>

<script>
import ReplyEditor from "./ReplyEditor";
export default {
  name: "QuestionList",
  components: { ReplyEditor },
  props: {
    questions: { type: Array, require: true }
  },
  computed: {
    questionList() {
      return this.reverse ? this.questions.slice().reverse() : this.questions;
    }
  },
  methods: {
    questionUpdateHandler() {
      this.$emit("update-questions");
    }
  },
  data() {
    return {
      reverse: true
    };
  }
};
</script>

<style scoped></style>
