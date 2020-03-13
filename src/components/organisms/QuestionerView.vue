<template>
  <div v-if="game" class="row">
    <div class="twelve columns">
      <p>{{ game.situation }}</p>
    </div>
    <div v-if="game.resolved" class="twelve columns">
      <p>{{ game.answer }}</p>
    </div>
    <div class="twelve columns">
      <textarea name="question-text"></textarea>
    </div>
    <div class="twelve columns u-pull-right">
      <div class="u-pull-right">
        <input type="text" name="question-author" placeholder="名前" />
        <button>質問する</button>
      </div>
    </div>
    <div style="margin-top: 12px;">
      <div class="twelve columns scroll-holder">
        <ul v-for="(q, i) in game.questions" :key="i">
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
                  >回答なし.&nbsp;</span
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

export default {
  name: "QuestionerView",
  props: {
    game: { type: Game }
  },
  methods: {
    isTrue(q) {
      return q.reply.type === "TRUE";
    },
    isFalse(q) {
      return q.reply.type === "FALSE";
    },
    isRejected(q) {
      return q.reply.type === "REJECT";
    }
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
