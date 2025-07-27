'use client';

import { useState } from "react";
import Link from "next/link";

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
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState(null);

  const handleSearch = () => {
    const match = exampleRecipes[query];
    setRecipe(match || null);
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
        <h1 className="text-4xl font-bold text-[#97572b] text-center mb-4">🍽️ Meal Match</h1>
        <p className="text-[#97572b] text-center mb-6 text-lg">Enter your favorite dish or try one of these!</p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {Object.keys(exampleRecipes).map((name) => (
            <button
              key={name}
              onClick={() => { setQuery(name); setRecipe(exampleRecipes[name]); }}
              className="bg-[#f78f48] hover:bg-[#d87a60] text-white px-4 py-2 rounded-full text-sm font-semibold"
            >
              {name}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter recipe name (e.g., Brownies)"
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

        {recipe ? (
          <div className="bg-[#fff5ea] rounded-lg p-4 border border-[#b16927] text-[#97572b]">
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
