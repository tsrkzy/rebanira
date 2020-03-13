<template>
  <div v-if="display && game" class="row">
    <div class="twelve columns">
      <h6>状況説明と設問</h6>
      <textarea
        name="situation-editor"
        v-model="game.situation"
        placeholder="ある男が、レストランでウミガメのスープを注文した。"
        @change="situationChangeHandler"
      ></textarea>
    </div>
    <div class="twelve columns">
      <h6>答え</h6>
      <textarea
        name="answer-editor"
        v-model="game.answer"
        placeholder="あのとき飲んだスープはウミガメの味ではなかった"
        @change="answerChangeHandler"
      ></textarea>
    </div>
    <organizer-question-list
      :questions="game.questions"
      @update-questions="updateQuestionsHandler"
    ></organizer-question-list>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";
import OrganizerQuestionList from "./OrganizerQuestionList";

export default {
  name: "OrganizerView",
  components: { OrganizerQuestionList },
  model: { props: "game", event: "update-game" },
  props: {
    game: { type: Game },
    display: { type: Boolean, require: true }
  },
  methods: {
    situationChangeHandler() {
      this.$emit("update-game", this.game);
    },
    answerChangeHandler() {
      this.$emit("update-game", this.game);
    },
    updateQuestionsHandler() {
      this.$emit("update-game", this.game);
    }
  }
};
</script>

<style scoped></style>
