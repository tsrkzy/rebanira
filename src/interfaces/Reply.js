import firebase from "firebase/app";
import { dateFormat } from "../util/util";

export class Reply {
  text = "";
  status = Reply.UNDEFINED;
  datetime = "";

  static TRUE = "TRUE";
  static FALSE = "FALSE";
  static REJECT = "REJECT";
  static UNDEFINED = "UNDEFINED";

  static LABEL_TRUE = "はい";
  static LABEL_FALSE = "いいえ";
  static LABEL_REJECT = "回答なし";
  static LABEL_UNDEFINED = "未回答";
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
    this.text = data.text || "";
    this.status = data.status || Reply.UNDEFINED;
    this.datetime = data.datetime || firebase.firestore.Timestamp.now();
    return this;
  }

  get date() {
    return this.datetime ? dateFormat(this.datetime.toDate()) : "";
  }

  isTrue() {
    return this.status === Reply.TRUE;
  }
  isFalse() {
    return this.status === Reply.FALSE;
  }
  isReject() {
    return this.status === Reply.REJECT;
  }
  isUndefined() {
    return !this.isTrue() && !this.isFalse() && !this.isReject();
  }

  /** export to object for firebase */
  toObject() {
    return {
      text: this.text || "",
      status: this.status || Reply.UNDEFINED,
      datetime: this.datetime || firebase.firestore.Timestamp.now()
    };
  }
}
