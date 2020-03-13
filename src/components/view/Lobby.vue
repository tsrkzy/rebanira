<template>
  <div>
    <create-game-form></create-game-form>
    <game-list :game-list="gameList"></game-list>
  </div>
</template>

<script>
import { Game } from "../../interfaces/Game";
import CreateGameForm from "../organisms/CreateGameForm";
import GameList from "../organisms/GameList";

export default {
  name: "Lobby",
  components: { CreateGameForm, GameList },
  created() {
    const gameList = [];
    const refGame = Game.getRef();
    refGame
      .orderBy("datetime", "desc")
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(doc => {
          const game = new Game(doc);
          gameList.push(game);
        });
      });

    this.gameList = gameList;
  },
  data() {
    return {
      gameList: []
    };
  }
};
</script>

<style scoped></style>
