import async = require('async');
import * as fs from 'fs/promises';
import path = require('path');
import { Battle } from '../definitions/schemas/mongoose/battle';
import { generateSubmissionsData } from './generateSubmissionData';
import { getLocalISOString, loadComment } from './loadDatabaseNew';

const generateBattleData = async (pathToBattle: string) => {
  console.log('Generating battle data for ' + pathToBattle);
  pathToBattle = path.join(process.cwd(), pathToBattle);
  const model = 'Battle';
  const commentPrefix = '00000000000000000bac';
  let postId = '000000000000000000000b';
  const postIdx = pathToBattle.replace(/^\/*|\/*$/g, '').split('/').slice(-1)[0]!.slice(0, 2);
  postId += postIdx;
  try {
    const dir = await fs.opendir(pathToBattle);
    for await (const entry of dir) {
      switch (entry.name) {
        case 'submissions': {
          const pathToSubmissions = path.join(pathToBattle, 'submissions');
          await generateSubmissionsData(pathToSubmissions, postId);
          break;
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
          break;
        }

        case 'comments.ts': {
          const { comments } = await import(path.join(pathToBattle, 'comments'));
          try {
            const loadCommentBind = loadComment.bind({ model: model, postId: postId, postIdx: postIdx, commentPrefix: commentPrefix});
            await async.eachOf(comments, loadCommentBind);
          } catch (err) {
            console.error(err);
          }
          break;
        }

      }
    }
  } catch (err) {
    console.error(err);
  }
  
};

export { generateBattleData };