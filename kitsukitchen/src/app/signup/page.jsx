"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      alert("Signup successful!");
      router.push("/");
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
   <main
      className="flex min-h-screen bg-[#efd9be] items-center justify-center"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSignup}
        className="bg-[#97572b] p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-white text-center">Sign Up</h2>
        <input
          className="w-full mt-1 px-4 py-2 border border-[#ffca52] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffca52] text-white placeholder:text-[#ffca52]/40"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Email"
        />
        <input
          className="w-full mt-1 px-4 py-2 border border-[#ffca52] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffca52] text-white placeholder:text-[#ffca52]/40"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full bg-[#f78f48] text-white py-2 rounded-md hover:bg-[#d87a60] transition-colors font-medium"
        >
          Sign Up
        </button>
        <p className="text-center text-white mt-4">
          Already have an account?{' '}
          <a href="/" className="underline text-[#ffca52] hover:text-[#f78f48]">
            Login
          </a>
        </p>
      </form>
    </main>

  );
}
