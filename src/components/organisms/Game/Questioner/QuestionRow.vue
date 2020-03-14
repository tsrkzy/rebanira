<template>
  <div :style="hiddenStyle">
    <div class="phrase">
      <p>{{ question.text }}, {{ question.id }}</p>
      <div class="reply">
        <p>
          <span
            class="reply reply-status"
            :style="replyStyles"
            v-text="question.labels.text"
          ></span>
          <span
            v-if="question.reply.text"
            v-text="` - ${question.reply.text}`"
          ></span>
        </p>
      </div>
    </div>
    <hr v-if="partition" />
  </div>
</template>

<script>
import { Question } from "../../../../interfaces/Question";

export default {
  name: "QuestionRow",
  props: {
    question: { type: Question },
    partition: { type: Boolean, default: false }
  },
  computed: {
    hiddenStyle() {
      const styles = {};
      this.question.hidden && (styles.display = "none");
      return styles;
    },
    replyStyles() {
      const q = this.question;
      return { color: q.labels.rgba, fontWeight: "bold" };
    }
  }
};
</script>

<style scoped lang="scss">
hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
