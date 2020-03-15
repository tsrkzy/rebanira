<template>
  <div>
    <div class="row mb-2">
      <div class="twelve columns">
        <div v-if="!organizer" class="u-pull-right">
          <input
            name="organizer-password"
            type="text"
            placeholder="パスワード"
            v-model="password"
          />
          <button name="organizer-authorizer" @click="suOrganizerHandler">
            出題者モード
          </button>
          <button v-if="$store.state.debug" @click="organizer = true">
            CHEAT
          </button>
        </div>
        <div v-if="organizer" class="u-pull-right">
          <button @click="organizer = false">参加者モード</button>
        </div>
        <h5 class="mb-0">{{ name }}</h5>
        <a href="#" @click="clipMarkdownLink">clip markdown link</a>
      </div>
    </div>
    <div v-if="game && game.resolved" class="row">
      <div class="twelve columns">
        <p>解決済み</p>
      </div>
    </div>
    <questioner-view
      ref="qView"
      :game="game"
      :questions="questions"
      :display="!organizer"
      @update-game="updateGameHandler"
      @add-question="addQuestionHandler"
    ></questioner-view>
    <organizer-view
      ref="oView"
      :game="game"
      :questions="questions"
      :display="organizer"
      @update-game="updateGameHandler"
      @update-questions="updateQuestionListHandler"
      @exit-organizer="organizer = false"
    ></organizer-view>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";
import { Question } from "../../interfaces/Question";
import OrganizerView from "../organisms/Game/Organizer/OrganizerView";
import QuestionerView from "../organisms/Game/Questioner/QuestionerView";

export default {
  name: "Game",
  components: { OrganizerView, QuestionerView },
  created() {
    this.gameId = this.$route.params.game_id;
    if (!this.gameId) {
      this.$router.push({ path: "/game/not-found" });
    }
    this.connect();
  },
  beforeDestroy() {
    this.gameUnsubscribe();
    this.gameUnsubscribe = null;
    this.questionsUnsubscribe();
    this.questionsUnsubscribe = null;
  },
  methods: {
    connect() {
      const gameRef = Game.getRef();
      this.gameUnsubscribe = gameRef.doc(this.gameId).onSnapshot(
        doc => {
          this.game = new Game(doc);
        },
        e => {
          console.error(e);
          console.error("接続が切断されました。再接続します。");
          this.connect();
        }
      );
      const questionRef = Question.getRef();
      this.questionsUnsubscribe = questionRef
        .where("gameId", "==", this.gameId)
        .orderBy("datetime", "asc")
        .onSnapshot(querySnapShot => {
          const changes = querySnapShot.docChanges();
          for (let i = 0; i < changes.length; i++) {
            const change = changes[i];
            const id = change.doc.id;
            switch (change.type) {
              case "added": {
                this.questions.push(new Question(this.gameId, change.doc));
                break;
              }
              case "modified": {
                const index = this.questions.findIndex(q => q.id === id);
                const q = new Question(this.gameId, change.doc);
                this.questions.splice(index, 1, q);
                break;
              }
              case "removed": {
                const index = this.questions.findIndex(q => q.id === id);
                this.questions.splice(index, 1);
                break;
              }
            }
          }
        });
    },
    clipMarkdownLink() {
      const name = this.name.replace(/([[]])/g, "\\$1");
      const uri = location.href;
      const markdown = `"${this.game.situation}" - [${name} | Rebanira:オンライン水平思考クイズセッション支援ツール](${uri})`;
      const textarea = document.createElement("TEXTAREA");
      textarea.innerText = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    },
    /** @param game {Game} */
    async updateGameHandler(game) {
      return this.updateGame(game);
    },
    async updateGame(game) {
      const gameRef = Game.getRef();
      gameRef
        .doc(game.id)
        .set(game.toObject())
        .then(() => {
          this.flush();
        })
        .catch(e => {
          console.error(e);
        });
    },
    async addQuestionHandler(data) {
      const question = new Question();
      if (!data.text.trim() || !data.author.trim()) {
        return false;
      }
      question.initData({
        gameId: this.gameId,
        author: data.author,
        text: data.text,
        hidden: data.hidden,
        datetime: data.datetime,
        reply: data.reply
      });
      const questionRef = Question.getRef();
      questionRef
        .add(question.toObject())
        .then(docRef => {
          return docRef.get().then(doc => {
            console.log("質問を追加", doc);
          });
        })
        .catch(e => {
          console.error(e);
        });
    },
    /** @param questions {Question[]} */
    async updateQuestionListHandler(questions) {
      const promiseList = [];
      questions.forEach(q => {
        promiseList.push(this.updateQuestionHandler(q));
      });
      return Promise.all(promiseList);
    },
    /** @param question {Question} */
    async updateQuestionHandler(question) {
      return this.updateQuestion(question);
    },
    async updateQuestion(question) {
      const questionRef = Question.getRef();
      questionRef
        .doc(question.id)
        .set(question.toObject())
        .then(() => {
          this.flush();
        })
        .catch(e => {
          console.error(e);
        });
    },
    flush() {
      this.$refs.qView && this.$refs.qView.flush();
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
      questions: [],
      password: null,
      organizer: false,
      gameUnsubscribe: null,
      questionsUnsubscribe: null
    };
  }
};
</script>

<style scoped lang="scss"></style>
