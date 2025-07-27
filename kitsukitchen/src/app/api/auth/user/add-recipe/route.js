import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req) {
  const { username, title, ingredients, steps } = await req.json();

  if (!username || !title || !ingredients || !steps) {
    return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
  }

  await connectToDatabase();

  const user = await User.findOne({ username });
  if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });

  user.recipes.push({ title, ingredients, steps });
  await user.save();

  return new Response(JSON.stringify({ message: 'Recipe added', recipes: user.recipes }), { status: 200 });
}
