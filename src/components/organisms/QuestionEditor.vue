<template>
  <div>
    <p style="margin-bottom: 0;">
      {{ question.text }}
    </p>
    <p style="margin-bottom: 0;">
      {{ question.date }}, {{ question.author }}&nbsp;
      <a @click="edit = !edit" style="cursor: pointer;">{{
        edit ? "[閉じる]" : "[回答を編集]"
      }}</a>
    </p>
    <p v-if="!edit">
      {{ question.reply.status }}&nbsp;-&nbsp;{{ question.reply.text }}
    </p>
    <div v-if="edit">
      <reply-status-selector
        v-model="question.reply.status"
        @change-status="changeReplyStatusHandler"
      ></reply-status-selector>
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
import ReplyStatusSelector from "./ReplyStatusSelector";

export default {
  name: "QuestionEditor",
  components: { ReplyStatusSelector },
  props: {
    question: { type: Question, require: true }
  },
  methods: {
    changeReplyStatusHandler() {
      this.$emit("update-question", this.question);
    }
  },
  data() {
    return {
      edit: false
    };
  }
};
</script>

<style scoped></style>
