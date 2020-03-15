<template>
  <div class="row">
    <div v-if="!create" class="twelve columns">
      <div class="u-pull-right">
        <button name="open-create-game-form" @click="create = true">
          問題を作成する
        </button>
      </div>
    </div>
    <div v-if="create">
      <div class="twelve columns">
        <h6>タイトル</h6>
        <textarea
          name="game-name"
          v-model="name"
          placeholder="例: ウミガメのスープ"
        ></textarea>
      </div>
      <div class="twelve columns">
        <h6>問題</h6>
        <textarea
          name="game-situation"
          v-model="situation"
          placeholder="例: レストランを訪れ、ウミガメのスープを注文した男が自殺した。なぜだろう。"
        ></textarea>
      </div>
      <div class="twelve columns">
        <h6>作成者</h6>
        <input
          type="text"
          name="game-situation"
          v-model="author"
          placeholder="あなたの名前"
        />
      </div>
      <div class="twelve columns">
        <h6>出題者用パスワード</h6>
        <input
          type="text"
          name="game-situation"
          v-model="password"
          autocomplete="off"
          placeholder="rebanira"
          style="margin-bottom: 0;"
        />
        <p style="color: firebrick;">
          暗号化を行いません。重要なパスワードを使用しないでください。
        </p>
      </div>
      <button
        :disabled="disable"
        name="create-new-game"
        @click="createGameHandler"
      >
        作成する
      </button>
      <hr />
    </div>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";

export default {
  name: "CreateGameForm",
  data() {
    return {
      create: false,
      name: "",
      situation: "",
      author: "",
      password: ""
    };
  },
  computed: {
    disable() {
      return (
        !this.name.trim() ||
        !this.situation.trim() ||
        !this.author.trim() ||
        !this.password.trim()
      );
    }
  },
  methods: {
    async createGameHandler() {
      const game = new Game();
      const data = {
        author: this.author,
        name: this.name,
        situation: this.situation,
        password: this.password
      };
      if (
        !data.author.trim() ||
        !data.name.trim() ||
        !data.situation.trim() ||
        !data.password.trim()
      ) {
        return false;
      }
      game.initData(data);
      const gameRef = Game.getRef();
      gameRef.add(game.toObject()).then(doc => {
        this.$router.push(`/game/${doc.id}`);
      });
      this.create = false;
    }
  }
};
</script>

<style scoped></style>
