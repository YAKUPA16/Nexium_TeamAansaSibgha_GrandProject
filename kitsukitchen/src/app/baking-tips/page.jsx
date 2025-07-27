'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function BakingTips() {
  const tips = [
    "🧁 Always preheat your oven before baking.",
    "🥚 Use room temperature ingredients unless stated otherwise.",
    "⚖️ Measure ingredients accurately — baking is science!",
    "🎂 Don’t overmix your batter — it can make goods tough.",
    "🧻 Use parchment paper to prevent sticking and for easy cleanup.",
    "🍰 Test with a toothpick — it should come out clean.",
    "🧊 Cool baked goods completely before slicing or frosting.",
    "🌡️ Use an oven thermometer to ensure correct temperature.",
    "🥄 Weigh ingredients (especially flour) for precision.",
    "🍪 Store cookies and cakes in airtight containers."
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-[#f6e7da] p-6"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-2xl text-center border border-[#f0d4bd]">
        <h1 className="text-5xl font-extrabold text-[#97572b] mb-4 drop-shadow-sm">
          Baking Tips 🍞
        </h1>
        <p className="text-[#7b4a2c] text-lg mb-6">
          Sweet secrets to perfect your baking every time!
        </p>

        <ul className="text-left space-y-3 text-[#5a3723] font-medium">
          {tips.map((tip, index) => (
            <motion.li
              key={index}
              className="bg-[#fff4ec] p-3 rounded-xl shadow-sm hover:shadow-md transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {tip}
            </motion.li>
          ))}
        </ul>

        <Link
          href="/dashboard"
          className="mt-8 inline-block px-6 py-3 bg-[#f78f48] text-white text-lg rounded-xl hover:bg-[#d87a60] transition-colors shadow-md"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
