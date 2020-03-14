<template>
  <div class="twelve columns">
    <h6>質問への回答</h6>
    <div v-for="q in questions" :key="q.id" class="twelve columns">
      <reply-editor
        :question="q"
        @update-question="questionUpdateHandler"
      ></reply-editor>
    </div>
  </div>
</template>

<script>
import ReplyEditor from "./ReplyEditor";
export default {
  name: "QuestionList",
  components: { ReplyEditor },
  props: {
    questions: { type: Array, require: true }
  },
  methods: {
    questionUpdateHandler() {
      this.$emit("update-questions");
    }
  }
};
</script>

<style scoped></style>
