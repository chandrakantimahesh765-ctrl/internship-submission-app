import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold">My Awesome Notes App</h1>
        <div className="flex items-center justify-center gap-4">
          <Link href="/register" className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold">Register</Link>
          <Link href="/login" className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 font-semibold">Login</Link>
        </div>
      </div>
    </main>
  );
}