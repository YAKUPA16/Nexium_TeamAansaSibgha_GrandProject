"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function MagicLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Verifying magic link...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("Invalid magic link.");
      return;
    }
    fetch("/api/auth/verify-magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("Login successful! Redirecting...");
          localStorage.setItem("user", JSON.stringify(data.user));
          setTimeout(() => router.push("/dashboard"), 1500);
        } else {
          setStatus(data.message || "Invalid or expired link.");
        }
      });
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#efd9be]"
      style={{
        backgroundImage: "url(/kitchen.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#97572b]">Login by Link</h1>
        <p>{status}</p>
      </div>
    </div>
  );
}
