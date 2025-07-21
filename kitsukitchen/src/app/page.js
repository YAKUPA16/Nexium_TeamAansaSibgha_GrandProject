"use client";
import { useState } from "react";

export default function Home() {
  const [flipped, setFlipped] = useState(false);

  return (
    <main className="flex min-h-screen bg-[#efd9be] perspective-[1500px] overflow-hidden">
      {/* Left Side - Content Behind Flip */}
      <div className="w-1/2 flex items-center justify-center p-8 z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl text-[#97572b] font-sans tracking-wide font-bold">
            KitsuKitchen
          </h1>
          <h2 className="mt-4 text-lg text-[#97572b]">
            Your favorite recipes, all in one place!
          </h2>
        </div>
      </div>

      {/* Right Side - Flip Container */}
      <div className="w-1/2 relative">
        <div
          className={`absolute top-0 left-0 w-full h-full transform transition-transform duration-1000 origin-left ${flipped ? "rotate-y-[-180deg]" : "rotate-y-0"} [transform-style:preserve-3d]`}
        >
          {/* Front - Login (Book Cover) */}
          <div className="absolute w-full h-full [backface-visibility:hidden] bg-[#97572b] flex items-center justify-center outline-dashed outline-2 outline-offset-[-10px] outline-[#ffca52] rounded-2xl">
            <form
              className="w-full max-w-md px-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setFlipped(true);
              }}
            >
              <h2 className="text-3xl font-bold text-white text-center">Login</h2>

              <div>
                <label className="block text-sm font-medium text-white">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-2 border border-[#ffca52] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffca52] text-[#b16927] placeholder:text-[#ffca52]/40"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-2 border border-[#ffca52] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffca52] text-[#b16927] placeholder:text-[#ffca52]/40"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f78f48] text-white py-2 rounded-md hover:bg-[#d87a60] transition-colors font-medium"
              >
                Login
              </button>
            </form>
          </div>

          {/* Back - After Flip (Main Page) */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rotate-y-180 bg-[#97572b] rounded-2xl flex items-center justify-end">
            <div className="w-[98%] h-[95%] bg-[#efd9be] rounded-2xl flex items-center justify-end">
              <h2 className="text-3xl text-[#b16927] font-bold">Welcome to KitsuKitchen!</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
