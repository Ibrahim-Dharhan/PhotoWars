import async from 'async';
import * as fs from 'fs/promises';
import path from 'path';
import { Comment } from '../definitions/schemas/mongoose/comment';
import { Battle } from '../definitions/schemas/mongoose/battle';
import { generateSubmissionsData } from './generateSubmissionData';

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
  comment._id = '00000000000000000bac';
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
};

const generateBattleData = async (pathToBattle: string) => {
  const model = 'Battle';
  let postId = '000000000000000000000b';
  const postIdx = pathToBattle.replace(/^\/*|\/*$/g, '').split('/').slice(-1)[0]!.slice(0, 2);
  postId += postIdx;
  try {
    const dir = await fs.opendir(pathToBattle);
    for await (const entry of dir) {
      switch (entry.name) {
        case 'submissions': {
          const pathToSubmissions = path.join(pathToBattle, 'submissions');
          generateSubmissionsData(pathToSubmissions, postId);
          return;
        }

        case 'image': {
          const { battle } = await import(path.join(pathToBattle, 'battle'));
          const imageDir = await fs.readdir(path.join(pathToBattle, entry.name));
          for (const imageName of imageDir) {
            /* Should only be one image here.  */
            battle.filename = imageName;
          }
          battle._id = postId;
          battle.creationTime = getLocalISOString(new Date());

          try {
            await Battle.create(battle);
          } catch (err) {
            console.error(err);
          }
          return;
        }

        case 'comments.ts': {
          const { comments } = await import(path.join(pathToBattle, 'comments'))
          try {
            await async.eachOf(comments, loadComment.bind(model, postId, postIdx));
          } catch (err) {
            console.error(err);
          }
          return;
        }

      }
    }

    dir.close();
  } catch (err) {
    console.error(err);
  }
  
};

export { generateBattleData };