"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("cm:token");
    if (isAuthenticated) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-t-purple-600 border-r-transparent border-b-purple-600 border-l-transparent rounded-full animate-spin"></div>
    </div>
  );
}
