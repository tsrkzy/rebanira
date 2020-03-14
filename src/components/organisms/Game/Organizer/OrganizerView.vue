<template>
  <div v-if="display && game" class="row">
    <div class="twelve columns">
      <h6>状況説明と設問</h6>
      <textarea
        name="situation-editor"
        v-model="game.situation"
        placeholder="問題を入力しましょう。"
        @change="situationChangeHandler"
      ></textarea>
    </div>
    <div class="twelve columns">
      <h6>答え</h6>
      <textarea
        name="answer-editor"
        v-model="game.answer"
        placeholder="答えを入力しましょう。解決までは公開されません。"
        @change="answerChangeHandler"
      ></textarea>
    </div>
    <div v-if="!game.resolved" class="twelve columns">
      <!-- 間違えて解決しちゃうとどっちらけなのでブラウザの自動補完OFF -->
      <p
        v-if="resolveInProgress"
        v-text="'慎重に！解決すると答えが公開され、その操作は取り消せません！'"
      ></p>
      <input
        v-if="resolveInProgress"
        type="text"
        autocomplete="off"
        placeholder="パスワード"
        v-model="resolvePassword"
      />
      <button
        class="danger"
        v-if="resolveInProgress"
        @click="resolveExecuteHandler"
      >
        答えを公開する
      </button>
      <button v-else @click="resolveHandler">解決済みにする</button>
    </div>
    <question-list
      :questions="questions"
      @update-questions="updateQuestionsHandler"
    ></question-list>
  </div>
</template>

<script>
import { Game } from "../../../../interfaces/Game";
import QuestionList from "./QuestionList";

export default {
  name: "OrganizerView",
  components: { QuestionList },
  model: { props: "game", event: "update-game" },
  props: {
    game: { type: Game },
    questions: { type: Array },
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
      this.$emit("update-questions", this.questions);
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
