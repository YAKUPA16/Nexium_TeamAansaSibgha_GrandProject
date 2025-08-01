"use client";

import { useState } from "react";
import Link from "next/link";

// Demo example for right panel
const demoExample = {
  name: "Garlic Lemon Chicken",
  ingredients: ["Chicken", "Garlic", "Lemon", "Olive Oil", "Salt", "Pepper"],
  steps: [
    "Marinate chicken with garlic, lemon juice, salt, and pepper.",
    "Heat olive oil in a pan and cook chicken until golden.",
    "Serve with lemon wedges and fresh herbs.",
  ],
};

export default function MealMatch() {
  const [ingredients, setIngredients] = useState("");
  const [theme, setTheme] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState("");

  const handleGenerate = async () => {
    if (!ingredients || !theme) {
      setStatus("⚠ Please enter ingredients and a theme!");
      return;
    }

    setStatus("✨ Sending to n8n...");

    try {
      const response = await fetch("/api/n8n-mealmatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients.split(",").map((i) => i.trim()),
          theme,
        }),
      });

      if (!response.ok) throw new Error("Failed to send to n8n");

      const data = await response.json();
      console.log("🍳 Received Recipe:", data);

      if (data?.ingredients?.length && data?.steps?.length) {
        setRecipe(data);
        setStatus("✅ Recipe ready!");
      } else {
        setStatus("⚠ No valid recipe returned.");
      }
    } catch (error) {
      console.error("❌ Error generating recipe:", error);
      setStatus("❌ Error sending to n8n");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#efd9be] flex justify-center items-center p-10"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-row w-full max-w-6xl gap-8">
        {/* Left Panel - Main Form */}
        <div className="flex-1 bg-white/90 rounded-2xl p-8 shadow-xl border border-[#b16927]">
          <h1 className="text-4xl font-bold text-[#97572b] mb-4 text-center">
            🍳 Meal Match
          </h1>
          <p className="text-[#97572b] mb-6 text-center text-lg font-medium">
            Went to the kitchen and only found random ingredients?  
            Don't worry—enter them, pick a theme, and we’ll cook up an idea!
          </p>

          {/* Input Form */}
          <div className="mb-4">
            <label className="block text-[#97572b] font-semibold mb-2">
              Ingredients (comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g., Chicken, Garlic, Lemon"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-2 rounded-md border border-[#b16927] text-[#97572b]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[#97572b] font-semibold mb-2">
              Theme / Type of Food
            </label>
            <input
              type="text"
              placeholder="e.g., Italian, Breakfast, Spicy"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-2 rounded-md border border-[#b16927] text-[#97572b]"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-[#b16927] hover:bg-[#97572b] text-white px-4 py-2 rounded-md mb-4"
          >
            Generate Recipe 🍽️
          </button>

          {status && <p className="text-center mt-2 text-[#b16927]">{status}</p>}

          {/* Display Recipe */}
          {recipe && (
            <div className="bg-[#fff5ea] rounded-lg p-4 border border-[#b16927] text-[#97572b] mt-4 shadow">
              <h2 className="text-2xl font-semibold mb-2">{recipe.name}</h2>
              <p className="font-bold">Ingredients:</p>
              <ul className="list-disc list-inside mb-2">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
              <p className="font-bold">Steps:</p>
              <ol className="list-decimal list-inside">
                {recipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>

        {/* Right Panel - Demo Example */}
        <div className="w-1/3 bg-[#fff5ea] p-6 rounded-2xl border border-[#b16927] shadow-lg flex flex-col">
          <h2 className="text-2xl font-bold text-[#97572b] mb-4 text-center">✨ How it Works</h2>
          <p className="text-[#97572b] mb-6 text-center">
            Fill in your ingredients and theme, click “Generate Recipe,” and enjoy!
          </p>

          {/* Demo Form */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#f0d4bd] mb-4">
            <input
              type="text"
              value="Chicken, Garlic, Lemon"
              disabled
              className="w-full p-2 mb-3 rounded-md border border-[#b16927] bg-[#fff8f2] text-[#b16927] opacity-80"
            />
            <input
              type="text"
              value="Italian"
              disabled
              className="w-full p-2 mb-3 rounded-md border border-[#b16927] bg-[#fff8f2] text-[#b16927] opacity-80"
            />
            <button
              disabled
              className="w-full bg-[#ffca52] text-[#97572b] px-4 py-2 rounded-md mb-3 opacity-70 cursor-not-allowed"
            >
              Generate Recipe 🍳
            </button>

            <div className="bg-[#fff3e0] rounded-lg p-4 border border-[#b16927] text-[#97572b] mt-2 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{demoExample.name}</h3>
              <p className="font-bold">Ingredients:</p>
              <ul className="list-disc list-inside mb-2 text-sm">
                {demoExample.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
              <p className="font-bold">Steps:</p>
              <ol className="list-decimal list-inside text-sm">
                {demoExample.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-[#f78f48] text-white rounded-md hover:bg-[#d87a60] transition-colors"
            >
              ⬅ Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
