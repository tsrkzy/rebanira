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
    <create-question-form
      ref="qForm"
      v-if="!game.resolved"
      @create-question="addQuestionHandler"
    ></create-question-form>
    <question-list :questions="questions"></question-list>
  </div>
</template>

<script>
import { Game } from "../../../../interfaces/Game";
import QuestionList from "./QuestionList";
import CreateQuestionForm from "./CreateQuestionForm";

export default {
  name: "QuestionerView",
  components: { QuestionList, CreateQuestionForm },
  props: {
    game: { type: Game },
    questions: { type: Array },
    display: { type: Boolean, require: true }
  },
  methods: {
    addQuestionHandler(question) {
      this.$emit("add-question", question);
    },
    flush() {
      this.$refs.qForm && this.$refs.qForm.flush();
    }
  }
};
</script>

<style scoped lang="scss"></style>
