import { Post } from "./post";
import { UserFrontend } from "./user";

class SubmissionShared extends Post {
  filename: string;
  post: string;

  constructor() {
    super();
    this.filename = '';
    this.post= '';
  }
}

class SubmissionFrontend extends SubmissionShared {
  _id: string;
  __v?: number;
  override author: string;

  constructor() {
    super();
    this._id = '';
    this.__v = 0;
    this.author = '';
  }
}

class PopulatedSubmissionFrontend extends SubmissionShared {
  _id: string;
  __v?: number;
  override author: UserFrontend;

  constructor() {
    super();
    this._id = '';
    this.__v = 0;
    this.author = new UserFrontend();
  }
}

export { PopulatedSubmissionFrontend, SubmissionFrontend };