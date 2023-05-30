import { Post } from "./post";
import { UserFrontend } from "./user";

class BattleShared extends Post {
  deadline: string;
  filename: string;

  constructor() {
    super();
    this.deadline = '';
    this.filename = '';
  }
}

class BattleFrontend extends BattleShared {
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

class PopulatedBattleFrontend extends BattleShared {
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

export { BattleFrontend, PopulatedBattleFrontend };