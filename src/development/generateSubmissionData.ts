import * as fs from 'fs/promises';
import async = require('async');
import path = require('path');
import { getLocalISOString, moveImagesToPublic } from './loadDatabaseNew';
import { generateComment } from './generateCommentData';
import { Submission } from '../definitions/schemas/mongoose/submission';
import { uploadFileToS3 } from '../definitions/s3';

/* Get constants.  */
import * as constants from '../definitions/constants';
import dotenv = require('dotenv');
dotenv.config();
const IMAGE_DIR = process.env['IMAGE_DIR'] || constants._imageDir;

async function generateSubmissionData(this: any, pathToSubmission: string, callback: any) {
  const model = 'Submission';
  const commentPrefix = '00000000000000000aac';
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
          if (process.env['IMAGE_DIR']) {
            await uploadFileToS3({
              path: path.join(IMAGE_DIR, submission.filename),
              filename: submission.filename
            });
            console.log(`Uploaded file ${submission.filename} to Amazon S3.`);
          } else {
            await moveImagesToPublic(path.join(pathToSubmission, 'image'), submission.filename);
          }
        }
        submission.post = this.battleId;
        submission._id = postId;
        submission.creationTime = getLocalISOString(new Date());
        await Submission.create(submission);
        break;
      }

      case 'comments.ts': {
        const { comments } = await import(path.join(pathToSubmission, 'comments'))
        try {
          const generateCommentBind = generateComment.bind({model: model, postId: postId, postIdx: postIdx, commentPrefix: commentPrefix});
          await async.eachOf(comments, generateCommentBind);
        } catch (err) {
          console.error(err);
        }
        break;
      }
    }
  }

  callback();
}

const generateSubmissionsData = async (pathToSubmissions: string, battleId: string) => {
  try {
    let submissionNames = await fs.readdir(pathToSubmissions);
    submissionNames = submissionNames.map((sName) => path.join(pathToSubmissions, sName));
    await async.each(submissionNames, generateSubmissionData.bind({battleId: battleId}));
  } catch (err) {
    console.error(err);
  }
};

export { generateSubmissionsData };