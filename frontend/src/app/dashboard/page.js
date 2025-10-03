'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import NoteForm from '@/components/NoteForm';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // The base URL for our API, taken from the environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchNotes = useCallback(async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${API_URL}/notes`, config);
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes', error);
    }
  }, [API_URL]);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchInitialData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const userResponse = await axios.get(`${API_URL}/users/profile`, config);
        setUser(userResponse.data);
        await fetchNotes(token);
      } catch (error) {
        localStorage.removeItem('userToken');
        router.push('/login');
      }
    };
    fetchInitialData();
  }, [router, API_URL, fetchNotes]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    router.push('/login');
  };

  const handleNoteCreated = async (noteData) => {
    const token = localStorage.getItem('userToken');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`${API_URL}/notes`, noteData, config);
      await fetchNotes(token);
    } catch (error) {
      console.error('Failed to create note', error);
    }
  };

  const handleNoteDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    const token = localStorage.getItem('userToken');
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`${API_URL}/notes/${noteId}`, config);
      await fetchNotes(token);
    } catch (error) {
      console.error('Failed to delete note', error);
    }
  };
  
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard!</h1>
          <button onClick={handleLogout} className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700">Logout</button>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl mb-4">Welcome, {user.name}!</h2>
          <p className="text-gray-400"><strong>Email:</strong> {user.email}</p>
        </div>

        <NoteForm onNoteCreated={handleNoteCreated} />

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl">Your Notes</h2>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {filteredNotes.length > 0 ? (
            <div className="space-y-4">
              {filteredNotes.map((note) => (
                <div key={note._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-xl">{note.title}</h3>
                    <p className="text-gray-400">{note.content}</p>
                  </div>
                  <button
                    onClick={() => handleNoteDelete(note._id)}
                    className="px-3 py-1 text-sm font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">You haven&apos;t created any notes yet, or no notes match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}