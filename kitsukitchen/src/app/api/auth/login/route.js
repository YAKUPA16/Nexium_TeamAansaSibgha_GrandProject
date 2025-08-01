import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return new Response(JSON.stringify({ message: 'Missing credentials' }), { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ username });
  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid username' }), { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return new Response(JSON.stringify({ message: 'Invalid password' }), { status: 401 });
  }

  return new Response(JSON.stringify({
    message: 'Login successful',
    user: {
      username: user.username,
      recipes: user.recipes,
    },
  }), { status: 200 });
}
