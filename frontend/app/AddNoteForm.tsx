"use client";

import { useState } from 'react';
import axios from 'axios';

interface NoteFormProps {
  onNoteAdded: () => void;
}

const API_URL = 'http://localhost:3001/notes';

const NoteForm: React.FC<NoteFormProps> = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, {
        title: title,
        author: {
          name: authorName,
          email: authorEmail,
        },
        content: content,
      });

      console.log('Note added successfully:', response.data);
      setTitle('');
      setAuthorName('');
      setAuthorEmail('');
      setContent('');
      setAdding(false);

      // Trigger a data refresh
      onNoteAdded();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <button name="add_new_note" onClick={() => setAdding(true)}>Add New Note</button>
      {adding && (
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text"  value={title} onChange={(e) => setTitle(e.target.value)} required /><br /><br />

          <label>Author Name:</label>
          <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required /><br /><br />

          <label>Author Email:</label>
          <input type="text" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} required /><br /><br />

          <label>Content:</label>
          <textarea name= "text_input_new_note" value={content} onChange={(e) => setContent(e.target.value)} required /><br /><br />

          <button name="text_input_save_new_note" type="submit">Save</button>
          <button name="text_input_cancel_new_note" type="button" onClick={() => setAdding(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default NoteForm;
