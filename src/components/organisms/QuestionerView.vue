<template>
  <div v-if="display && game" class="row">
    <div class="twelve columns">
      <h6>問題</h6>
      <pre><code>{{ game.situation }}</code></pre>
    </div>
    <div v-if="game.resolved" class="twelve columns">
      <h6>真相</h6>
      <pre><code>{{ game.answer }}</code></pre>
    </div>
    <question-form @create-question="addQuestionHandler"></question-form>
    <questioner-question-list
      :questions="game.questions"
    ></questioner-question-list>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";
import QuestionerQuestionList from "./QuestionerQuestionList";
import QuestionForm from "./QuestionForm";

export default {
  name: "QuestionerView",
  components: { QuestionerQuestionList, QuestionForm },
  props: {
    game: { type: Game },
    display: { type: Boolean, require: true }
  },
  methods: {
    addQuestionHandler(question) {
      this.game.questions.push(question);
      this.$emit("update-game", this.game);
    },
    flush() {
      this.text = "";
    }
  },
  data() {
    return {
      text: "",
      author: ""
    };
  }
};
</script>

<style scoped lang="scss">
ul {
  margin-top: 0.8rem;
  margin-bottom: 0;
  list-style: none;

  li {
    margin: 0;

    ul {
      margin-top: 0;
    }
  }
}
</style>
