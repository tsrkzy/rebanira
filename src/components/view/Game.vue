<template>
  <div>
    <div v-if="!organizer" class="row">
      <div class="twelve columns">
        <div class="u-pull-right">
          <input name="organizer-password" type="password" v-model="password" />
          <button name="organizer-authorizer" @click="suOrganizerHandler">
            出題者モード
          </button>
          <button @click="organizer = true">CHEAT</button>
        </div>
        <h5>{{ name }}</h5>
      </div>
    </div>

    <!-- 回答者モード -->
    <questioner-view
      ref="qView"
      v-if="!organizer"
      v-model="game"
      @add-question="addQuestionHandler"
    ></questioner-view>

    <!-- 出題者モード-->
    <organizer-view ref="oView" v-if="organizer" :game="game"></organizer-view>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";
import OrganizerView from "../organisms/OrganizerView";
import QuestionerView from "../organisms/QuestionerView";

export default {
  name: "Game",
  components: { OrganizerView, QuestionerView },
  async created() {
    this.gameId = this.$route.params.game_id;
    if (!this.gameId) {
      this.$router.push({ path: "/game/not-found" });
    }
    const gameRef = Game.getRef();
    return gameRef
      .doc(this.gameId)
      .get()
      .then(doc => {
        this.game = new Game(doc);
      });
  },
  methods: {
    /**
     * @param game {Game}
     */
    addQuestionHandler(game) {
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
