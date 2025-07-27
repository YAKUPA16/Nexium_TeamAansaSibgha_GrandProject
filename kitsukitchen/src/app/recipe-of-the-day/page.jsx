import Link from "next/link";

export default function RecipeOfTheDay() {
  const recipe = {
    title: "Chocolate Chip Banana Muffins",
    image: "/bannana-muffins.jpg", // make sure this image exists in /public
    ingredients: [
      "2 ripe bananas",
      "1 cup flour",
      "1/2 cup sugar",
      "1/4 cup melted butter",
      "1 tsp baking powder",
      "1 egg",
      "1/2 cup chocolate chips",
      "Pinch of salt",
    ],
    steps: [
      "Preheat oven to 180°C (350°F).",
      "Mash bananas in a bowl.",
      "Add sugar, egg, and melted butter. Mix well.",
      "In a separate bowl, mix flour, salt, and baking powder.",
      "Combine wet and dry ingredients. Fold in chocolate chips.",
      "Pour batter into muffin tray with liners.",
      "Bake for 20–25 minutes or until golden brown.",
      "Let them cool before serving. Enjoy!",
    ],
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-[#efd9be] p-6"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-[#97572b] mb-6 text-center">🍌 Recipe of the Day</h1>

        <div className="w-full flex flex-col items-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="rounded-xl mb-4 w-full h-64 object-cover shadow-md"
          />
          <h2 className="text-2xl font-semibold text-[#b16927] mb-2">{recipe.title}</h2>

          <div className="text-left w-full mt-4">
            <h3 className="text-lg font-bold text-[#97572b] mb-1">Ingredients:</h3>
            <ul className="list-disc list-inside text-[#633c1e] mb-4">
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3 className="text-lg font-bold text-[#97572b] mb-1">Steps:</h3>
            <ol className="list-decimal list-inside text-[#633c1e] space-y-1">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-[#f78f48] text-white rounded-md hover:bg-[#d87a60] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
