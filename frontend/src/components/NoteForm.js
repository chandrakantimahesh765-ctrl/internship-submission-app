'use client';

import { useState } from 'react';

export default function NoteForm({ onNoteCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onNoteCreated({ title, content });
    // Clear the form fields after successful submission
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl mb-4">Add a New Note</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-md hover:bg-green-700">
          Add Note
        </button>
      </div>
    </form>
  );
}