import Link from "next/link";

export default function RandomRecipe() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#efd9be]"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl font-bold text-[#97572b] mb-4">Random Recipe</h1>
      <p className="text-lg text-[#97572b] mb-8">This is the Random Recipe page.</p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-[#f78f48] text-white rounded-md hover:bg-[#d87a60] transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
