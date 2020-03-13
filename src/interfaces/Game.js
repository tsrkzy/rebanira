import firebase from "firebase/app";
import { dateFormat } from "../util/util";

export class Game {
  id;
  answer = "";
  author = "";
  name = "";
  situation = "";
  questions = [];
  datetime = null;
  resolved = false;
  constructor(doc) {
    if (!doc) {
      return this;
    }
    this.id = doc.id;
    this.initData(doc.data());
  }

  /**
   * @param data {{author:String,name:String,situation:String,questions:Array,resolved: boolean}}
   */
  initData(data) {
    this.author = data.author;
    this.name = data.name;
    this.situation = data.situation;
    this.questions = data.questions;
    this.datetime = data.datetime;
    this.resolved = data.resolved;
  }

  get date() {
    return this.datetime ? dateFormat(this.datetime.toDate()) : "";
  }

  /** export to object for firebase */
  toObject() {
    const o = {
      answer: this.answer || "",
      author: this.author || "",
      name: this.name || "",
      situation: this.situation || "",
      questions: this.questions || [],
      datetime: this.datetime || firebase.firestore.Timestamp.now(),
      resolved: this.resolved || false
    };
    return o;
  }

  static getRef() {
    const refGame = firebase.firestore().collection("game");
    return refGame;
  }
}
