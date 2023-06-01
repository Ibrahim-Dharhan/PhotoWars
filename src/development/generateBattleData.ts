import async = require('async');
import * as fs from 'fs/promises';
import path = require('path');
import { Battle } from '../definitions/schemas/mongoose/battle';
import { generateSubmissionsData } from './generateSubmissionData';
import { getLocalISOString, moveImagesToPublic } from './loadDatabaseNew';
import { uploadFileToS3 } from '../definitions/s3';
import { generateComment } from './generateCommentData';
// import { generateVote } from './generateVoteData';

/* Get constants.  */
import * as constants from '../definitions/constants';
import dotenv = require('dotenv');
dotenv.config();
const IMAGE_DIR = process.env['IMAGE_DIR'] || constants._imageDir;

const generateBattleData = async (pathToBattle: string) => {
  console.log('Generating battle data for ' + pathToBattle);
  pathToBattle = path.join(process.cwd(), pathToBattle);
  const model = 'Battle';
  const commentPrefix = '000000000000000000bc';
  const postIdx = pathToBattle.replace(/^\/*|\/*$/g, '').split('/').slice(-1)[0]!.slice(0, 2);
  const postId = '000000000000000000000b' + postIdx;
  try {
    const dir = await fs.opendir(pathToBattle);
    for await (const entry of dir) {
      switch (entry.name) {
        case 'comments': {
          const { comments } = await import(path.join(pathToBattle, 'comments/comments'));
          try {
            const generateCommentBind = generateComment.bind({
              model: model,
              postId: postId,
              postIdx: postIdx,
              commentPrefix: commentPrefix
            });
            await async.eachOf(comments, generateCommentBind);
          } catch (err) {
            console.error(err);
          }
          break;
        }

        case 'image': {
          const { battle } = await import(path.join(pathToBattle, 'battle'));
          const imageDir = await fs.readdir(path.join(pathToBattle, entry.name));
          for (const imageName of imageDir) {
            /* Should only be one image here.  */
            battle.filename = imageName;
            if (process.env['IMAGE_DIR']) {
              await uploadFileToS3({
                path: path.join(IMAGE_DIR, battle.filename),
                filename: battle.filename
              });
              console.log(`Uploaded file ${battle.filename} to Amazon S3.`);
            } else {
              await moveImagesToPublic(path.join(pathToBattle, 'image'), battle.filename);
            }
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

        case 'submissions': {
          const pathToSubmissions = path.join(pathToBattle, 'submissions');
          await generateSubmissionsData(pathToSubmissions, postId);
          break;
        }

        /*
        case 'votes.ts': {
          const { votes } = await import(path.join(pathToBattle, 'votes'));
          try {
            const generateVoteBind = generateVote.bind({
              postId: postId,
              postIdx: postIdx
            });
            await async.eachOf(votes, generateVoteBind);
          } catch (err) {
            console.error(err);
          }
          break;
        }
        */
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export { generateBattleData };