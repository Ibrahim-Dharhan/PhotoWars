import { fakeUsers } from "../../../../users";

const comments = [
  {
    author: fakeUsers[3]!._id,
    caption: 'Now you need to make one of Hamlet',
  },
  {
    author: fakeUsers[4]!._id,
    caption: 'The Pirates of the Catribbean: The pussy is scared',
  }
] as any;

export { comments };