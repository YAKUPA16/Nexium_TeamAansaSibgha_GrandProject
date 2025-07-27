import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../../../../lib/mongodb';


const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function POST(req)  {
  const { token } = await req.json();
  if (!token) {
    return new Response(JSON.stringify({ success: false, message: 'No token provided.' }), { status: 400 });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Find user by email (implement getUserByEmail in your db lib)
    const user = await getUserByEmail(payload.email);
    if (!user) {
      return new Response(JSON.stringify({ success: false, message: 'User not found.' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, user }), { status: 200 });
  } catch (e) {
    console.error('verify-magic-link error:', e);
    return new Response(JSON.stringify({ success: false, message: 'Invalid or expired token.' }), { status: 400 });
  }
}
