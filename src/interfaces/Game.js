import firebase from "firebase/app";
import { dateFormat } from "../util/util";

export class Game {
  id;
  author = "";
  name = "";
  situation = "";
  answer = "";
  datetime = null;
  password = null;
  resolved = false;
  constructor(doc) {
    if (!doc) {
      return this;
    }
    this.id = doc.id;
    this.initData(doc.data());
  }

  /**
   * @param data {{author:String,name:String,situation:String,resolved: ?boolean}}
   */
  initData(data) {
    this.author = data.author;
    this.name = data.name;
    this.situation = data.situation;
    this.datetime = data.datetime || firebase.firestore.Timestamp.now();
    this.password = data.password;
    this.answer = data.answer;
    this.resolved = data.resolved;
    return this;
  }

  get date() {
    return this.datetime ? dateFormat(this.datetime.toDate()) : "";
  }

  /** export to object for firebase */
  toObject() {
    return {
      answer: this.answer || "",
      author: this.author || "",
      name: this.name || "",
      situation: this.situation || "",
      datetime: this.datetime || firebase.firestore.Timestamp.now(),
      password: this.password || null,
      resolved: this.resolved || false
    };
  }

  static getRef() {
    const refGame = firebase.firestore().collection("game");
    return refGame;
  }
}
