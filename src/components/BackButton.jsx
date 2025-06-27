"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ label = "← Back" }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-6 inline-flex items-center text-m text-blue-600 hover:text-blue-800 transition"
    >
      {label}
    </button>
  );
}
