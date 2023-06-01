import { fakeUsers } from "../../../../users";

const comments = [
  {
    author: fakeUsers[4]!._id,
    caption: 'A minor edit, but a well appreciated one',
  },
  {
    author: fakeUsers[0]!._id,
    caption: 'Spin the damn bottle.',
  }
] as any;

export { comments };