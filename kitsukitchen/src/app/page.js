"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setStatus("Sending magic link...");
    const res = await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("Magic link sent! Check your email.");
      alert("Link sent to your inbox. Click it to login.");
    } else {
      setStatus(data.message || "Error sending magic link.");
    }
  };

  return (
    <main
      className="flex min-h-screen bg-[#efd9be] perspective-[1500px] overflow-hidden"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Panel - Static welcome area */}
      <div className="w-1/2 flex items-center justify-center p-10 z-10">
        <div className="flex flex-col items-center text-center">
          <img
            src="/Logo.png"
            alt="KitsuKitchen Logo"
            className="w-20 h-20 mb-2"
          />
          <h1 className="text-4xl text-[#97572b] font-sans tracking-wide font-bold" style={{ textShadow: "0 0 6px rgba(255,255,255,0.8)" }}> 
            KitsuKitchen
          </h1>
          <h2 className="mt-4 text-lg text-[#5f371c]" style={{ textShadow: "0 0 6px rgba(255,255,255,0.9)" }}>
            Your favorite recipes, all in one place!
          </h2>
        </div>
      </div>

      {/* Right Panel - Magic Link Login */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full h-full bg-[#97572b] flex items-center justify-center outline-dashed outline-2 outline-offset-[-10px] outline-[#ffca52] rounded-2xl">
          <form
            className="w-full max-w-md px-8 space-y-6"
            onSubmit={handleMagicLink}
          >
            <h2 className="text-3xl font-bold text-white text-center">Login</h2>
            <div>
              <label className="block text-sm font-medium text-white">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 border border-[#ffca52] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffca52] text-white placeholder:text-[#ffca52]/40"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#f78f48] text-white py-2 rounded-md hover:bg-[#d87a60] transition-colors font-medium"
            >
              Login 
            </button>
            {status && <p className="text-center text-white mt-4">{status}</p>}
            <p className="text-center text-white mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="underline text-[#ffca52] hover:text-[#f78f48]"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
