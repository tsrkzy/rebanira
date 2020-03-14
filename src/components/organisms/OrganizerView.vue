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
    <div v-if="!game.resolved" class="twelve columns">
      <!-- 間違えて解決しちゃうとどっちらけなのでブラウザの自動補完OFF -->
      <span v-if="resolveInProgress" v-text="'答えを公開したら取り消せません！'"></span>
      <input
        v-if="resolveInProgress"
        type="password"
        autocomplete="off"
        v-model="resolvePassword"
      />
      <button class="danger" v-if="resolveInProgress" @click="resolveExecuteHandler">
        答えを公開
      </button>
      <button v-else @click="resolveHandler">答えを公開</button>
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
    },
    resolvedChangeHandler() {
      this.$emit("update-game", this.game);
    },
    resolveHandler() {
      this.resolveInProgress = true;
    },
    resolveExecuteHandler() {
      this.game.resolved = true;
      this.$emit("update-game", this.game);
    }
  },
  data() {
    return {
      resolveInProgress: false,
      resolvePassword: ""
    };
  }
};
</script>

<style scoped></style>
