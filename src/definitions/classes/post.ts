class Post {
  _id: string;
  author: string;
  battle?: string;
  caption: string;
  creationTime: string;
  filename: string;

  constructor() {
    this._id = '';
    this.author = '';
    this.battle = '';
    this.caption = '';
    this.creationTime = '';
    this.filename = '';
  }
}

export { Post };
