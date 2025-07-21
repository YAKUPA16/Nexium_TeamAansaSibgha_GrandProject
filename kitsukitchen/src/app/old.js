export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#efd9be]">
      {/* Left Side - Blank */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl text-[#97572b] font-sans tracking-wide font-bold">
            KitsuKitchen
          </h1>
          <h2 className="mt-4 text-lg text-[#97572b]">
            Your favorite recipes, all in one place!
          </h2>
        </div>
      </div>


      {/* Right Side - Login Section (no visible box) */}
      <div className="w-1/2 bg-[#97572b] flex items-center justify-center outline-dashed outline-2 outline-offset-[-10px] outline-[#ffca52] rounded-2xl">
        <form className="w-full max-w-md px-8 space-y-6">
          <h2 className="text-3xl font-bold text-[#ffffff] text-center">Login</h2>

          <div>
            <label className="block text-sm font-medium text-[#ffffff]">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border border-[#ffca52] bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffca52] text-[#b16927] placeholder:text-[#ffca52]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#ffffff]">Password</label>
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
    </main>
  );
}
