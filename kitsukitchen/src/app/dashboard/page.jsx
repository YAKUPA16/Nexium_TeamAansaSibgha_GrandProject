'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) return;
    setUser(storedUser);
    setRecipes(storedUser.recipes || []);
  }, []);

  const handleAddRecipe = async () => {
    const res = await fetch('/api/user/add-recipe', {
      method: 'POST',
      body: JSON.stringify({
        username: user.username,
        title,
        ingredients: ingredients.split(','),
        steps: steps.split(','),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Recipe added!');
      setRecipes(data.recipes);
    } else {
      alert(data.message);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#efd9be]"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto pt-8 gap-8">
        {/* Sidebar */}
        <div className="md:w-1/3 w-full bg-[#97572b] rounded-2xl flex flex-col justify-between items-start p-8 shadow-xl mb-8 md:mb-0 min-h-[80vh]">
          <div className="flex flex-row items-center gap-3 mb-6">
            <img src="/Logo.png" alt="KitsuKitchen Logo" className="w-16 h-16" />
            <h1 className="text-3xl text-white font-sans tracking-wide font-bold">KitsuKitchen</h1>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-bold text-[#ffca52] text-left w-full mb-2">Recipe Generators</h2>
            <Link href="/meal-match" className="w-full block text-center bg-[#f78f48] text-white py-3 rounded-md hover:bg-[#d87a60] transition-colors font-semibold text-lg">Meal Match</Link>
            <Link href="/recipe-of-the-day" className="w-full block text-center bg-[#ffca52] text-[#97572b] py-3 rounded-md hover:bg-[#f7b048] transition-colors font-semibold text-lg border border-[#97572b]">Recipe of the Day</Link>
            <Link href="/random-recipe" className="w-full block text-center bg-[#b16927] text-white py-3 rounded-md hover:bg-[#97572b] transition-colors font-semibold text-lg">Random Recipe</Link>
            <Link href="/baking-tips" className="w-full block text-center bg-[#efd9be] text-[#b16927] py-3 rounded-md hover:bg-[#ffca52] transition-colors font-semibold text-lg border border-[#b16927]">Baking Tips</Link>
          </div>

          <div className="w-full mt-8">
            <h2 className="text-xl font-bold mb-2 text-[#ffca52]">Add New Recipe</h2>
            <input className="border p-2 w-full mb-2 rounded-md" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input className="border p-2 w-full mb-2 rounded-md" placeholder="Ingredients (comma separated)" value={ingredients} onChange={e => setIngredients(e.target.value)} />
            <input className="border p-2 w-full mb-2 rounded-md" placeholder="Steps (comma separated)" value={steps} onChange={e => setSteps(e.target.value)} />
            <button className="bg-purple-500 text-white px-4 py-2 w-full rounded-md hover:bg-purple-600 transition-colors" onClick={handleAddRecipe}>Add Recipe</button>
          </div>
        </div>

        {/* Main Section */}
        <div className="md:w-2/3 w-full flex flex-col gap-8">
          {/* Recipes Block */}
          <div className="bg-white/90 rounded-2xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold mb-4 text-[#97572b]">Welcome{user?.username ? `, ${user.username}` : "!"}</h1>
            <h2 className="text-xl font-bold text-[#97572b] mb-4">Your Recipes</h2>

            {recipes.length === 0 && (
              <p className="text-[#b16927]">No recipes yet. Add one from the menu!</p>
            )}

            {recipes.map((r, idx) => (
              <div key={idx} className="border p-3 mb-4 rounded-lg bg-[#f8e7d1] shadow-sm hover:shadow-md transition-all">
                <h3 className="font-semibold text-[#b16927] text-lg mb-1">{r.title}</h3>
                <p className="text-sm"><strong>Ingredients:</strong> {r.ingredients.join(', ')}</p>
                <p className="text-sm"><strong>Steps:</strong> {r.steps.join(', ')}</p>
              </div>
            ))}
          </div>

          {/* Game Corner Block */}
          <div className="bg-[#fff3e0]/90 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-[#b16927] mb-4 text-center">Baking Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "Whisk" ,icon:"🧑‍🍳"},
                { name: "Mixing Bowl",icon:"🍪" },
                { name: "Measuring Cups" ,icon:"🧑‍🍳"},
                { name: "Oven Mitts",icon:"🍪" },
                { name: "Baking Tray",icon:"🧑‍🍳" },
                { name: "Spatula" ,icon:"🍪"},
                { name: "Timer",icon:"🧑‍🍳" },
                { name: "Parchement Paper",icon:"🍪" },
                { name: "Cooling rack",icon:"🧑‍🍳" },
                { name: "Contianer" ,icon:"🍪"},
                { name: "Flour Shifter",icon:"🧑‍🍳" },
                { name: "Spoons",icon:"🍪" },
              ].map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#f0d4bd] shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all"
                >
                  <div className="text-4xl mb-2">{tool.icon}</div>
                  <p className="text-[#7a4b2a] font-medium">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
