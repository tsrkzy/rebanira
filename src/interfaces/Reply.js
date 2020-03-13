import firebase from "firebase/app";
import { dateFormat } from "../util/util";

export class Reply {
  text = "";
  type = "";
  datetime = "";
  constructor(doc) {
    if (!doc) {
      return this;
    }
    this.initData(doc.data());
  }

  /**
   * @param data {{author:String,text:String, datetime:Timestamp,reply:Object}}
   */
  initData(data) {
    if (!data) return this;
    this.text = data.text;
    this.type = data.type;
    this.datetime = data.datetime || firebase.firestore.Timestamp.now();
    return this;
  }

  get date() {
    return this.datetime ? dateFormat(this.datetime.toDate()) : "";
  }

  /** export to object for firebase */
  toObject() {
    return {
      text: this.text || "",
      type: this.type || "",
      datetime: this.datetime || firebase.firestore.Timestamp.now()
    };
  }
}
