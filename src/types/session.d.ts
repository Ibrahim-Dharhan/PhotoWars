import mongoose from 'mongoose';

declare module 'express-session' {
  interface SessionData {
    logged_in: boolean,
    user_id: mongoose.Types.ObjectId
  }
}

export {};
