<template>
  <div v-if="game" class="row">
    <div class="twelve columns">
      <h6>状況説明と設問</h6>
      <textarea
        name="situation-editor"
        v-model="game.situation"
        placeholder="ある男が、レストランでウミガメのスープを注文した。"
      ></textarea>
    </div>
    <div class="twelve columns">
      <h6>答え</h6>
      <textarea
        name="answer-editor"
        v-model="game.answer"
        placeholder="あのとき飲んだスープはウミガメの味ではなかった"
      ></textarea>
    </div>
    <h6>質問への回答</h6>
    <div v-for="(q, i) in game.questions" :key="i" class="twelve columns">
      <p style="margin-bottom: 0;">
        {{ q.text }}
      </p>
      <p style="margin-bottom: 0;">
        {{ q.date }}, {{ q.author }}&nbsp;
        <a @click="q.edit = !q.edit" style="cursor: pointer;">{{
          q.edit ? "[閉じる]" : "[回答を編集]"
        }}</a>
      </p>
      <p v-if="!q.edit">{{ q.reply.type }}&nbsp;-&nbsp;{{ q.reply.text }}</p>
      <div v-if="q.edit">
        <div>
          <label>
            <input type="radio" name="type" value="TRUE" />
            <span>Yes</span>
          </label>
          <label>
            <input type="radio" name="type" value="FALSE" />
            <span>No</span>
          </label>
          <label>
            <input type="radio" name="type" value="REJECT" />
            <span>回答不可</span>
          </label>
        </div>
        <div>
          <textarea
            name="reply-text-editor"
            v-model="q.reply.text"
            placeholder="(任意)"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";

export default {
  name: "OrganizerView",
  props: {
    game: { type: Game }
  }
};
</script>

<style scoped></style>
