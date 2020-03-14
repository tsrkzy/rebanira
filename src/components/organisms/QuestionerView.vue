<template>
  <div v-if="display && game" class="row">
    <div class="twelve columns">
      <h6>問題</h6>
      <p>{{ game.situation }}</p>
    </div>
    <div v-if="game.resolved" class="twelve columns">
      <h6>真相</h6>
      <p>{{ game.answer }}</p>
    </div>
    <question-form
      ref="qForm"
      @create-question="addQuestionHandler"
    ></question-form>
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
      this.$refs.qForm.flush();
    }
  }
};
</script>

<style scoped lang="scss"></style>
