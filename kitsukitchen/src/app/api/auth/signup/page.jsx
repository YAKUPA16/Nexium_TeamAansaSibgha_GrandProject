'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert('Signup successful!');
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input className="border p-2 w-full mb-3" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input className="border p-2 w-full mb-3" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
