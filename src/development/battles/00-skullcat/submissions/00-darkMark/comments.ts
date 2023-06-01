import { fakeUsers } from "../../../../users";

const comments = [
  {
    author: fakeUsers[1]!._id,
    caption: 'This one is my favorite lol so good!',
  },
  {
    author: fakeUsers[2]!._id,
    caption: 'This is legit my favourite entry in this sub yet',
  }
] as any;

export { comments };