"use client";

import { useState } from "react";
import Link from "next/link";

// 🔹 Local sample recipes for testing (still usable)
const exampleRecipes = {
  Brownies: {
    ingredients: ["1/2 cup butter", "1 cup sugar", "2 eggs", "1/3 cup cocoa", "1/2 cup flour"],
    steps: ["Melt butter", "Mix all ingredients", "Bake at 180°C for 25 minutes"],
  },
  Pizza: {
    ingredients: ["1 pizza base", "1/2 cup tomato sauce", "1 cup cheese", "Toppings of choice"],
    steps: ["Spread sauce", "Add cheese & toppings", "Bake at 230°C for 12–15 min"],
  },
  Pancakes: {
    ingredients: ["1 cup flour", "1 egg", "3/4 cup milk", "2 tbsp sugar", "1 tsp baking powder"],
    steps: ["Mix ingredients", "Cook on skillet", "Flip when bubbles appear"],
  },
};

export default function MealMatch() {
  const [query, setQuery] = useState("");        // User input (e.g., "Cake")
  const [recipe, setRecipe] = useState(null);    // The recipe to display (sample or AI-generated)
  const [status, setStatus] = useState("");      // Status messages to show progress

  // 🔹 Sends recipe name to n8n via API route
  const sendToN8N = async (recipeName) => {
    setStatus("Sending to n8n...");
    try {
      const response = await fetch("/api/send-to-n8n", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe: recipeName }),
      });

      if (!response.ok) throw new Error("Failed to send to n8n");

      // ✅ Parse the response
      const rawData = await response.json();
      console.log("📦 Raw AI Recipe Response:", rawData);
      console.log("📜 Stringified JSON:", JSON.stringify(rawData, null, 2));

      // ✅ rawData is already the recipe object
      const aiRecipe = rawData;

      console.log("🍳 Parsed Recipe Object:", aiRecipe);

      if (aiRecipe?.ingredients?.length && aiRecipe?.steps?.length) {
        setRecipe(aiRecipe); // Directly set the recipe
        setStatus(null);
      } else {
        setStatus(`⚠ "${recipeName}" sent, but no valid recipe returned.`);
      }

    } catch (error) {
      console.error("❌ Error sending to n8n:", error);
      setStatus("❌ Error sending to n8n");
    }
  };

  // 🔹 When user clicks "Match 🍳"
  const handleSearch = () => {
    // 1. Try local sample recipes first
    const match = exampleRecipes[query];
    setRecipe(match || null);

    // 2. Always send query to n8n to try AI generation
    sendToN8N(query);
  };

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-[#efd9be] p-6"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-xl w-full bg-white/80 rounded-2xl p-6 shadow-lg mt-10">
        <h1 className="text-4xl font-bold text-[#97572b] text-center mb-4">🍽️ Instant Recipe</h1>
        <p className="text-[#97572b] text-center mb-6 text-lg">
          Enter your favorite dish or try one of these!
        </p>

        {/* 🔹 Quick buttons for sample recipes */}
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {Object.keys(exampleRecipes).map((name) => (
            <button
              key={name}
              onClick={() => setQuery(name)} // Only fills input
              className="bg-[#f78f48] hover:bg-[#d87a60] text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              {name}
            </button>
          ))}
        </div>

        {/* 🔹 Search box and Match button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter recipe name (e.g., Cake)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 rounded-md border border-[#97572b] text-[#97572b]"
          />
          <button
            onClick={handleSearch}
            className="bg-[#b16927] hover:bg-[#97572b] text-white px-4 py-2 rounded-md"
          >
            Match 🍳
          </button>
        </div>

        {/* 🔹 Status message */}
        {status && <p className="text-center mt-2">{status}</p>}

        {/* 🔹 Display recipe if available */}
        {recipe ? (
          <div className="bg-[#fff5ea] rounded-lg p-4 border border-[#b16927] text-[#97572b] mt-4">
            <h2 className="text-2xl font-semibold mb-2">{query} Recipe</h2>
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
        ) : (
          query && <p className="text-center text-[#b16927]">No recipe found. Try another!</p>
        )}

        {/* 🔹 Back button */}
        <div className="mt-6 text-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#f78f48] text-white rounded-md hover:bg-[#d87a60] transition-colors"
          >
            ⬅ Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
