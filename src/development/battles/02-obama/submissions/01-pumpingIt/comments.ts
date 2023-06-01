import { fakeUsers } from "../../../../users";

const comments = [
  {
    author: fakeUsers[2]!._id,
    caption: 'Obama looking disturbingly relaxed there.',
  },
  {
    author: fakeUsers[3]!._id,
    caption: 'This one works REALLY well. lmao',
  }
] as any;

export { comments };