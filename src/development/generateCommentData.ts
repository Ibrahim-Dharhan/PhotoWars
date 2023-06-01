import { getLocalISOString } from "./loadDatabaseNew";
import { Comment } from "../definitions/schemas/mongoose/comment";

async function generateComment(this: any, comment: any, index: any, callback: any) {
  let commentIdx = index.toString();
  if (index <= 9) commentIdx = '0' + commentIdx; // Turns '9' into '09'

  /* Set _id.  */
  comment._id = this.commentPrefix + this.postIdx + commentIdx;

  /* Set creationTime.  */
  comment.creationTime = getLocalISOString(new Date());

  /* Set type of post.  */
  comment.commentedModel = this.model;

  /* Set post id.  */
  comment.post = this.postId;

  try {
    await Comment.create(comment);
    console.log(`Added comment "${comment.caption}" to database.`)
  } catch (err) {
    console.error(err);
  }
  callback();
}

export { generateComment };