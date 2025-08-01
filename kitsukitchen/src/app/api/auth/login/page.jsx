'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // Store user data (not secure - use proper auth later)
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        className="border p-2 w-full mb-3 text-black"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        className="border p-2 w-full mb-3 text-black"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>

  );
}
