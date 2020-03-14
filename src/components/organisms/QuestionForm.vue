<template>
  <div>
    <div class="twelve columns">
      <textarea name="question-text" v-model="text"></textarea>
    </div>
    <div class="twelve columns u-pull-right">
      <div class="u-pull-right">
        <input
          type="text"
          name="question-author"
          placeholder="名前"
          v-model="author"
        />
        <button @click="addQuestionHandler">質問する</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Question } from "../../interfaces/Question";

export default {
  name: "QuestionForm",
  data() {
    return {
      text: "",
      author: ""
    };
  },
  methods: {
    addQuestionHandler() {
      const question = new Question().initData({
        author: this.author,
        text: this.text,
        reply: null
      });
      this.$emit("create-question", question);
    }
  }
};
</script>

<style scoped></style>
