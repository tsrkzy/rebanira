<template>
  <div>
    <div class="row">
      <div class="twelve columns">
        <div v-if="!organizer" class="u-pull-right">
          <input name="organizer-password" type="password" v-model="password" />
          <button name="organizer-authorizer" @click="suOrganizerHandler">
            出題者モード
          </button>
          <button v-if="$store.state.debug" @click="organizer = true">CHEAT</button>
        </div>
        <div v-if="organizer" class="u-pull-right">
          <button @click="organizer = false">参加者モード</button>
        </div>
        <h5>{{ name }}</h5>
      </div>
    </div>
    <questioner-view
      ref="qView"
      :game="game"
      :display="!organizer"
      @update-game="updateGameHandler"
    ></questioner-view>
    <organizer-view
      ref="oView"
      :game="game"
      :display="organizer"
      @update-game="updateGameHandler"
      @exit-organizer="organizer = false"
    ></organizer-view>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";
import OrganizerView from "../organisms/OrganizerView";
import QuestionerView from "../organisms/QuestionerView";

export default {
  name: "Game",
  components: { OrganizerView, QuestionerView },
  created() {
    this.gameId = this.$route.params.game_id;
    if (!this.gameId) {
      this.$router.push({ path: "/game/not-found" });
    }
    const gameRef = Game.getRef();
    this.unsubscribe = gameRef.doc(this.gameId).onSnapshot(doc => {
      this.game = new Game(doc);
    });
  },
  beforeDestroy() {
    this.unsubscribe();
    this.unsubscribe = null;
  },
  methods: {
    /**
     * @param game {Game}
     */
    async updateGameHandler(game) {
      return this.updateGame(game);
    },
    async updateGame(game) {
      const gameRef = Game.getRef();
      gameRef
        .doc(this.gameId)
        .set(game.toObject())
        .then(() => {
          this.$refs.qView.flush();
        })
        .catch(e => {
          console.error(e);
        });
    },
    suOrganizerHandler() {
      if (this.game.password !== this.password) {
        return false;
      }
      this.organizer = true;
    }
  },
  computed: {
    name() {
      return this.game ? this.game.name : "";
    }
  },
  data() {
    return {
      gameId: null,
      game: null,
      password: null,
      organizer: false
    };
  }
};
</script>

<style scoped lang="scss">
div.scroll-holder {
  max-height: 400px;
  overflow-y: scroll;
  border: 1px solid lightgray;
  padding: 1rem;
  border-radius: 0.4rem;
}

input[type="radio"] {
  margin-right: 1rem;
  margin-bottom: 0;
}
</style>
