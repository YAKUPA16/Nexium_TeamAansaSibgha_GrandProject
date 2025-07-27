import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Missing MONGODB_URI in .env.local');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

import User from '../models/user';

export async function getUserByEmail(email) {
  await connectToDatabase();
  // Try to find by username or email field (if you add email field later)
  return await User.findOne({ username: email });
}

export default connectToDatabase;
