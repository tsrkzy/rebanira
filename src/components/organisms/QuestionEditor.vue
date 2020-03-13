<template>
  <div>
    <p style="margin-bottom: 0;">
      {{ question.text }}
    </p>
    <p style="margin-bottom: 0;">
      {{ question.date }}, {{ question.author }}&nbsp;
      <a @click="question.edit = !question.edit" style="cursor: pointer;">{{
        question.edit ? "[閉じる]" : "[回答を編集]"
      }}</a>
    </p>
    <p v-if="!question.edit">
      {{ question.reply.type }}&nbsp;-&nbsp;{{ question.reply.text }}
    </p>
    <div v-if="question.edit">
      <reply-type-selector
        v-model="question.reply.type"
        @change-status="changeReplyStatusHandler"
      ></reply-type-selector>
      <div>
        <textarea
          name="reply-text-editor"
          v-model="question.reply.text"
          placeholder="(任意)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { Question } from "../../interfaces/Question";
import ReplyTypeSelector from "./ReplyTypeSelector";

export default {
  name: "QuestionEditor",
  components: { ReplyTypeSelector },
  props: {
    question: { type: Question, require: true }
  },
  methods: {
    changeReplyStatusHandler() {
      this.$emit("update-question", this.question);
    }
  }
};
</script>

<style scoped></style>
