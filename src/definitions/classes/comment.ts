import { BattleFrontend } from "./battle";
import { Post } from "./post";
import { SubmissionFrontend } from "./submission";
import { UserFrontend } from "./user";

class CommentShared extends Post {
  post: string | Post;
  constructor() {
    super();
    this.post = '';
  }
}

class CommentBackend extends CommentShared {
  override post: string;
  constructor() {
    super();
    this.post = '';
  }
}

class CommentFrontend extends CommentShared {
  _id: string;
  __v?: number;
  override author: string;
  commentedModel: string;

  constructor() {
    super();
    this._id = '';
    this.__v = 0;
    this.author = '';
    this.commentedModel = '';
  }
}

class PopulatedCommentFrontend extends CommentShared {
  _id: string;
  __v?: number;
  override author: UserFrontend;
  commentedModel: string;
  override post: SubmissionFrontend | BattleFrontend;

  constructor() {
    super();
    this._id = '';
    this.__v = 0;
    this.author = new UserFrontend();
    this.commentedModel = '';
    this.post = new BattleFrontend();
  }
}

export { CommentBackend, CommentFrontend, PopulatedCommentFrontend };