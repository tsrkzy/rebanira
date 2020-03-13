<template>
  <div>
    <label>
      <input type="radio" name="type" :value="TRUE" v-model="radioValue" />
      <span>Yes</span>
    </label>
    <label>
      <input type="radio" name="type" :value="FALSE" v-model="radioValue" />
      <span>No</span>
    </label>
    <label>
      <input type="radio" name="type" :value="REJECT" v-model="radioValue" />
      <span>回答不可</span>
    </label>
  </div>
</template>

<script>
const TRUE = "TRUE";
const FALSE = "FALSE";
const REJECT = "REJECT";
export default {
  name: "ReplyTypeSelector",
  model: { prop: "status", event: "change-status" },
  props: {
    status: { type: String }
  },
  created() {
    this.radioValue = status;
  },
  data() {
    return {
      TRUE,
      FALSE,
      REJECT,
      radioValue: null
    };
  },
  watch: {
    radioValue(v) {
      this.$emit("change-status", v);
    }
  }
};
</script>

<style scoped></style>
