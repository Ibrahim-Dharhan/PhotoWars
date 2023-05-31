import * as fs from 'fs/promises';
import async from 'async';
import { Comment } from "../definitions/schemas/mongoose/comment";
import path from 'path';

const getLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset()
  const offsetAbs = Math.abs(offset)
  const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()
  return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`
}

async function loadComment(this: any, comment: any, index: any, callback: any) {
  let commentIdx = index.toString();
  if (index <= 9) commentIdx = '0' + commentIdx; // Turns '9' into '09'

  /* Set _id.  */
  comment._id = '00000000000000000aac';
  comment._id += (this.postIdx as string) + commentIdx;

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


async function generateSubmissionData(this: any, pathToSubmission: string, callback: any) {
  const model = 'Submission';
  let postId = '000000000000000000000a';
  const postIdx = pathToSubmission.replace(/^\/*|\/*$/g, '').split('/').slice(-1)[0]!.slice(0, 2);
  postId += postIdx;
  const dir = await fs.opendir(pathToSubmission);
  for await (const entry of dir) {
    switch (entry.name) {
      case 'image': {
        const { submission } = await import(path.join(pathToSubmission, 'submission'));
        const imageDir = await fs.readdir(path.join(pathToSubmission, entry.name));
        for (const imageName of imageDir) {
          /* Should only be one image here.  */
          submission.filename = imageName;
        }
        submission.post = this.battleId;
        submission._id = postId;
        submission.creationTime = getLocalISOString(new Date());
        return;
      }

      case 'comments.ts': {
        const { comments } = await import(path.join(pathToSubmission, 'comments'))
        try {
          await async.eachOf(comments, loadComment.bind(model, postId, postIdx));
        } catch (err) {
          console.error(err);
        }
        return;
      }
    }
  }

  callback();
}

const generateSubmissionsData = async (pathToSubmissions: string, battleId: string) => {
  try {
    let submissionNames = await fs.readdir(pathToSubmissions);
    submissionNames = submissionNames.map((sName) => path.join(pathToSubmissions, sName));
    async.each(submissionNames, generateSubmissionData.bind(battleId));
  } catch (err) {
    console.error(err);
  }
};
export { generateSubmissionsData };