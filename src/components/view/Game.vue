<template>
  <div>
    <div v-if="!organizer" class="row">
      <div class="twelve columns">
        <div class="u-pull-right">
          <input name="organizer-password" type="password" />
          <button name="organizer-authorizer" @click="organizer = true">
            出題者モード
          </button>
        </div>
        <h5>{{ name }}</h5>
      </div>
    </div>

    <!-- 回答者モード(通常)-->
    <div v-if="!organizer" class="row">
      <div class="twelve columns">
        <p>{{ situation }}</p>
      </div>
      <div v-if="resolved" class="twelve columns">
        <p>{{ answer }}</p>
      </div>
      <div class="twelve columns">
        <textarea name="question-text"></textarea>
      </div>
      <div class="twelve columns u-pull-right">
        <div class="u-pull-right">
          <input type="text" name="question-author" placeholder="名前" />
          <button>質問する</button>
        </div>
      </div>
      <div style="margin-top: 12px;">
        <div class="twelve columns scroll-holder">
          <ul v-for="(q, i) in questionList" :key="i">
            <li>
              {{ q.text }}&nbsp;<em
                >-&nbsp;{{ q.datetime }},&nbsp;{{ q.author }}</em
              >
            </li>
            <li>
              <ul>
                <li>
                  <span
                    v-if="isTrue(q)"
                    style="color: steelblue; font-weight: bold;"
                    >Yes.&nbsp;</span
                  >
                  <span
                    v-else-if="isFalse(q)"
                    style="color: darksalmon; font-weight: bold;"
                    >No.&nbsp;</span
                  >
                  <span
                    v-else-if="isRejected(q)"
                    style="color: gray; font-weight: bold;"
                    >回答なし.&nbsp;</span
                  >
                  <span v-if="q.reply">{{ q.reply.text }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 出題者モード-->
    <div v-if="organizer" class="row">
      <div class="twelve columns">
        <h6>状況説明と設問</h6>
        <textarea
          name="situation-editor"
          v-model="situation"
          placeholder="ある男が、レストランでウミガメのスープを注文した。"
        ></textarea>
      </div>
      <div class="twelve columns">
        <h6>答え</h6>
        <textarea
          name="answer-editor"
          v-model="answer"
          placeholder="あのとき飲んだスープはウミガメの味ではなかった"
        ></textarea>
      </div>
      <h6>質問への回答</h6>
      <div v-for="(q, i) in questionList" :key="i" class="twelve columns">
        <p style="margin-bottom: 0;">
          {{ q.text }}
        </p>
        <p style="margin-bottom: 0;">
          {{ q.datetime }}, {{ q.author }}&nbsp;
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
  </div>
</template>

<script>
export default {
  name: "Game",
  created() {
    this.gameId = parseInt(this.$route.params.gameId, 10);
  },
  methods: {
    isTrue(q) {
      return q.reply.type === "TRUE";
    },
    isFalse(q) {
      return q.reply.type === "FALSE";
    },
    isRejected(q) {
      return q.reply.type === "REJECT";
    }
  },
  data() {
    return {
      gameId: null,
      name: "ウミガメのスープ",
      resolved: false,
      organizer: false,
      answer: "あのスープの味はウミガメのものではなかった。",
      situation:
        "レストランを訪れ、ウミガメのスープを注文した男が自殺した。なぜだろう。",
      questionList: [
        {
          author: "tsrkzy",
          text: "レストランで出された料理の味と関係がありますか",
          datetime: "2020-03-13T09:12:00",
          edit: false,
          reply: {
            text:
              "はい、レストランで供されたウミガメのスープの味に関係しています",
            type: "TRUE"
          }
        },
        {
          author: "tsrkzy",
          text: "そのスープは不味かった？",
          datetime: "2020-03-13T09:12:01",
          edit: false,
          reply: {
            text: "さあ、どうでしょう",
            type: "REJECT"
          }
        },
        {
          author: "tsrkzy",
          text: "そのレストランとは関係がありますか？",
          datetime: "2020-03-13T09:12:02",
          edit: false,
          reply: {
            text: "関係ありません。",
            type: "FALSE"
          }
        },
        {
          author: "tsrkzy",
          text: "レストランで出された料理の味と関係がありますか",
          datetime: "2020-03-13T09:12:03",
          edit: false,
          reply: {
            text:
              "はい、レストランで供されたウミガメのスープの味に関係しています",
            type: "TRUE"
          }
        },
        {
          author: "tsrkzy",
          text: "そのスープは不味かった？",
          datetime: "2020-03-13T09:12:04",
          edit: false,
          reply: {
            text: "さあ、どうでしょう",
            type: "REJECT"
          }
        },
        {
          author: "tsrkzy",
          text: "そのレストランとは関係がありますか？",
          datetime: "2020-03-13T09:12:05",
          edit: false,
          reply: {
            text: "関係ありません。",
            type: "FALSE"
          }
        },
        {
          author: "tsrkzy",
          text: "レストランで出された料理の味と関係がありますか",
          datetime: "2020-03-13T09:12:06",
          edit: false,
          reply: {
            text:
              "はい、レストランで供されたウミガメのスープの味に関係しています",
            type: "TRUE"
          }
        },
        {
          author: "tsrkzy",
          text: "そのスープは不味かった？",
          datetime: "2020-03-13T09:12:07",
          edit: false,
          reply: {
            text: "さあ、どうでしょう",
            type: "REJECT"
          }
        },
        {
          author: "tsrkzy",
          text: "そのレストランとは関係がありますか？",
          datetime: "2020-03-13T09:12:08",
          edit: false,
          reply: {
            text: "関係ありません。",
            type: "FALSE"
          }
        }
      ]
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

ul {
  margin-top: 0.8rem;
  margin-bottom: 0;
  list-style: none;

  li {
    margin: 0;

    ul {
      margin-top: 0;
    }
  }
}
</style>
