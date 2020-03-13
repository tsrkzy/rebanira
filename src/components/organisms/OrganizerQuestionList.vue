<template>
  <div class="twelve columns">
    <h6>質問への回答</h6>
    <div v-for="(q, i) in questions" :key="i" class="twelve columns">
      <question-editor
        :question="q"
        @update-question="questionUpdateHandler"
      ></question-editor>
    </div>
  </div>
</template>

<script>
import QuestionEditor from "./QuestionEditor";
export default {
  name: "OrganizerQuestionList",
  components: { QuestionEditor },
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
