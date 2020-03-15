<template>
  <div>
    <p style="margin-bottom: 0;">
      <span class="question-text">{{ question.text }}</span>
    </p>
    <p style="margin-bottom: 0;">
      <span class="question-author">posted by {{ question.author }}</span>
    </p>
    <p style="margin-bottom: 0;margin-left: 1.0rem;" v-if="$store.state.debug">
      <span class="reply-state" :style="{ color: question.labels.rgba }"
        >[{{ question.labels.text }}]</span
      >
      <span class="question-id">:{{ question.id }}</span>
    </p>

    <p v-if="question.reply.text">
      <span class="reply-text">{{ question.reply.text }}</span>
    </p>
    <status-selector
      :radio-key="question.id"
      v-model="question.reply.status"
      @change-status="changeReplyStatusHandler"
    ></status-selector>
    <div v-if="edit">
      <div>
        <textarea
          name="reply-text-editor"
          v-model="question.reply.text"
          placeholder="(任意)"
          @change="changeReplyTextHandler"
        ></textarea>
        <label>
          <input
            type="checkbox"
            v-model="question.hidden"
            @change="changeHiddenHandler"
          />
          <span>非表示にする</span>
        </label>
      </div>
    </div>
    <p style="margin-bottom: 0;">
      <a @click="edit = !edit" style="cursor: pointer;">{{
        edit ? "[閉じる]" : "[詳細編集]"
      }}</a>
    </p>
    <hr />
  </div>
</template>

<script>
import { Question } from "../../../../interfaces/Question";
import StatusSelector from "./StatusSelector";

export default {
  name: "ReplyEditor",
  components: { StatusSelector },
  props: {
    question: { type: Question, require: true }
  },
  computed: {
    questionText() {
      return `${this.question.text} posted by ${this.question.author}`;
    }
  },
  methods: {
    changeHiddenHandler() {
      this.$emit("update-question", this.question);
    },
    changeReplyStatusHandler() {
      this.$emit("update-question", this.question);
    },
    changeReplyTextHandler() {
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

<style scoped lang="scss">
textarea {
  margin-bottom: 0.5rem;
}

span {
  &.question-author {
    color: silver;
    font-weight: 300;
  }
}

input {
  margin-bottom: 1rem;
}

hr {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
