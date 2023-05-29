import { Post } from "./post";

class CommentFrontend {
  _id: string;
  author: string;
  commentedModel: string;
  creationTime: string;
  post: Post;
  text: string;
  numVotes: number;
  votedOn: boolean;

  constructor() {
    this._id = '';
    this.author = '';
    this.commentedModel = '';
    this.creationTime = '';
    this.post = new Post();
    this.text = '';
    this.numVotes = 0;
    this.votedOn = false;
  }
}

export { CommentFrontend };
