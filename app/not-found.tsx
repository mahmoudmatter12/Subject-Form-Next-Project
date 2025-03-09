// app/not-found.tsx
import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-900 to-black text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl  mt-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/user/dashboard"
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}