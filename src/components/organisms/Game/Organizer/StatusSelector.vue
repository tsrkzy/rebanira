<template>
  <div>
    <label>
      <input
        type="radio"
        :name="radioKey"
        :value="TRUE"
        v-model="radioValue"
      />
      <span>{{ LABEL_TRUE }}</span>
    </label>
    <label>
      <input
        type="radio"
        :name="radioKey"
        :value="FALSE"
        v-model="radioValue"
      />
      <span>{{ LABEL_FALSE }}</span>
    </label>
    <label>
      <input
        type="radio"
        :name="radioKey"
        :value="REJECT"
        v-model="radioValue"
      />
      <span>{{ LABEL_REJECT }}</span>
    </label>
    <label style="display: none;">
      <input
        type="radio"
        :name="radioKey"
        :value="UNDEFINED"
        v-model="radioValue"
      />
      <span>{{ LABEL_UNDEFINED }}</span>
    </label>
  </div>
</template>

<script>
import { Reply } from "../../../../interfaces/Reply";
const {
  TRUE,
  FALSE,
  REJECT,
  UNDEFINED,
  LABEL_TRUE,
  LABEL_FALSE,
  LABEL_REJECT,
  LABEL_UNDEFINED
} = Reply;

export default {
  name: "StatusSelector",
  model: { prop: "status", event: "change-status" },
  props: {
    radioKey: { type: String, required: true },
    status: { type: String }
  },
  created() {
    this.radioValue = this.status;
  },
  computed: {},
  data() {
    return {
      TRUE,
      FALSE,
      REJECT,
      UNDEFINED,
      LABEL_TRUE,
      LABEL_FALSE,
      LABEL_REJECT,
      LABEL_UNDEFINED,
      radioValue: null
    };
  },
  watch: {
    radioValue(v) {
      if (!v) {
        return false;
      }
      this.$emit("change-status", v || Reply.UNDEFINED);
    }
  }
};
</script>

<style scoped>
input {
  margin-bottom: 0;
}
</style>
