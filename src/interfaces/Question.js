import firebase from "firebase/app";
import { dateFormat } from "../util/util";
import { Reply } from "./Reply";

export class Question {
  author = "";
  text = "";
  hidden = false;
  /** {Timestamp} */
  datetime;
  /** {Reply} */
  reply;
  constructor(doc) {
    if (!doc) {
      return this;
    }
    this.id = doc.id;
    this.initData(doc.data());
  }

  /**
   * @param data {{author:String,text:String,hidden: Boolean, datetime:Timestamp,reply:Object}}
   */
  initData(data) {
    if (!data) return this;
    this.author = data.author;
    this.text = data.text;
    this.hidden = data.hidden;
    this.datetime = data.datetime || firebase.firestore.Timestamp.now();
    this.reply = new Reply().initData(data.reply);
    return this;
  }
  isTrue() {
    return this.reply && this.reply.isTrue();
  }
  isFalse() {
    return this.reply && this.reply.isFalse();
  }
  isRejected() {
    return this.reply && this.reply.isReject();
  }
  isUndefined() {
    return this.reply && this.reply.isUndefined();
  }
  get date() {
    return this.datetime ? dateFormat(this.datetime.toDate()) : "";
  }

  /** export to object for firebase */
  toObject() {
    return {
      author: this.author || "",
      text: this.text || "",
      hidden: this.hidden || false,
      datetime: this.datetime || firebase.firestore.Timestamp.now(),
      reply: this.reply ? this.reply.toObject() : null
    };
  }
}
