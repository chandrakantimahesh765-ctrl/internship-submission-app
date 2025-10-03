'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
      const userData = { name, email, password };
      const response = await axios.post(apiUrl, userData);

      console.log('Registration successful:', response.data);
      alert('Registration successful! Please log in.');
      router.push('/login');

    } catch (err) {
      console.error('API Error:', err);
      if (!err.response) {
        setError('Network error. The server may be waking up. Please wait a moment and try again.');
      } else {
        // This is an error from our backend (e.g., "Invalid credentials", "User already exists")
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              id="name" type="text" required
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
            <input
              id="email" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              id="password" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}