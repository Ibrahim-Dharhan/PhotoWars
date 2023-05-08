import mongoose = require('mongoose');

declare module 'express-session' {
  interface SessionData {
    logged_in: boolean,
    user_id: string
  }
}

export {};
