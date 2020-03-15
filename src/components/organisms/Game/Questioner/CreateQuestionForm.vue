<template>
  <div>
    <div class="twelve columns">
      <textarea
        name="question-text"
        placeholder="質問の本文"
        v-model="text"
      ></textarea>
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
import { Question } from "../../../../interfaces/Question";

export default {
  name: "CreateQuestionForm",
  created() {
    const { localStorage } = window;
    if (!localStorage) return false;
    this.author = localStorage.getItem("questionAuthorName") || "";
  },
  data() {
    return {
      text: "",
      author: ""
    };
  },
  methods: {
    flush() {
      this.text = "";
    },
    addQuestionHandler() {
      const question = new Question().initData({
        author: this.author,
        text: this.text,
        reply: null
      });
      this.$emit("create-question", question);
    }
  },
  watch: {
    author(author) {
      const { localStorage } = window;
      if (!localStorage) return false;
      localStorage.setItem("questionAuthorName", author);
    }
  }
};
</script>

<style scoped></style>
