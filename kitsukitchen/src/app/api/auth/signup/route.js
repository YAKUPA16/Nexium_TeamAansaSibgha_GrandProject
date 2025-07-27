import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: 'Missing credentials' }), { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}
