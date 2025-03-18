// app/not-found.tsx
"use client";
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl  mt-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <button onClick={() => router.back()} className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer">
        ← Go Back
      </button>
    </div>
  );
}