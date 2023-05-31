import * as fs from 'fs/promises';
import async = require('async');
import path = require('path');
import { getLocalISOString, loadComment } from './loadDatabaseNew';
import { Submission } from '../definitions/schemas/mongoose/submission';

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
          await async.eachOf(comments, loadComment.bind({model: model, postId: postId, postIdx: postIdx, commentPrefix: commentPrefix}));
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