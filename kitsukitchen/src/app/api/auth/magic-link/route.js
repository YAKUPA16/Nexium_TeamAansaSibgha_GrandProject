import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export async function POST(req) {
  const { email } = await req.json();
  if (!email) {
    return new Response(JSON.stringify({ message: 'Email required' }), { status: 400 });
  }

  // Generate a JWT token valid for 15 minutes
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' });
  const magicLink = `${BASE_URL}/magic-login?token=${token}`;


  // Use Gmail SMTP for production (Vercel)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // set in Vercel project settings
      pass: process.env.GMAIL_PASS, // app password, not your main Gmail password
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your KitsuKitchen Magic Login Link',
    html: `<p>Click to login: <a href="${magicLink}">${magicLink}</a></p>`
  });

  return new Response(JSON.stringify({ message: 'Magic link sent!' }), { status: 200 });
}
