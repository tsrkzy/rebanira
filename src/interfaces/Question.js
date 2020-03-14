import firebase from "firebase/app";
import { dateFormat } from "../util/util";
import { Reply } from "./Reply";

export class Question {
  author = "";
  text = "";
  datetime = null;
  reply = null;
  constructor(doc) {
    if (!doc) {
      return this;
    }
    this.id = doc.id;
    this.initData(doc.data());
  }

  /**
   * @param data {{author:String,text:String, datetime:Timestamp,reply:Object}}
   */
  initData(data) {
    if (!data) return this;
    this.author = data.author;
    this.text = data.text;
    this.datetime = data.datetime || firebase.firestore.Timestamp.now();
    this.reply = new Reply().initData(data.reply);
    return this;
  }

  get date() {
    return this.datetime ? dateFormat(this.datetime.toDate()) : "";
  }

  /** export to object for firebase */
  toObject() {
    return {
      author: this.author || "",
      text: this.text || "",
      datetime: this.datetime || firebase.firestore.Timestamp.now(),
      reply: this.reply ? this.reply.toObject() : null
    };
  }
}
