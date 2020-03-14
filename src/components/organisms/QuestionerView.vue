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
    <div style="margin-top: 12px;">
      <div class="twelve columns scroll-holder">
        <ul v-for="(q, i) in game.questions" :key="i" :style="questionStyles(q)">
          <li>
            {{ q.text }}&nbsp;<em>-&nbsp;{{ q.date }},&nbsp;{{ q.author }}</em>
          </li>
          <li>
            <ul>
              <li>
                <span
                  v-if="isTrue(q)"
                  style="color: steelblue; font-weight: bold;"
                  >Yes.&nbsp;</span
                >
                <span
                  v-else-if="isFalse(q)"
                  style="color: darksalmon; font-weight: bold;"
                  >No.&nbsp;</span
                >
                <span
                  v-else-if="isRejected(q)"
                  style="color: gray; font-weight: bold;"
                  >回答不可.&nbsp;</span
                >
                <span
                  v-else-if="isUndefined(q)"
                  style="color: gray; font-weight: bold;"
                  >回答待ち.&nbsp;</span
                >
                <span v-if="q.reply">{{ q.reply.text }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";
import { Question } from "../../interfaces/Question";

export default {
  name: "QuestionerView",
  props: {
    game: { type: Game },
    display: { type: Boolean, require: true }
  },
  methods: {
    isTrue(q) {
      return q.reply.isTrue();
    },
    isFalse(q) {
      return q.reply.isFalse();
    },
    isRejected(q) {
      return q.reply.isReject();
    },
    isUndefined(q) {
      return q.reply.isUndefined();
    },
    questionStyles(q) {
      const styles = {};
      q.hidden && (styles.display = "none");
      return styles;
    },
    addQuestionHandler() {
      const question = new Question().initData({
        author: this.author,
        text: this.text,
        reply: null
      });
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
