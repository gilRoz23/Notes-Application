"use client";

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from './ThemeContext';

interface Page_Properties {
  currentPage: number;
}

const NOTES_NUMBER = 10;
const API_URL = 'http://localhost:3001/notes';

interface Note {
  id: number;
  title: string;
  author: { name: string, email: string };
  content: string;
}

const Notes: React.FC<Page_Properties> = ({ currentPage: currPage }) => {
  const [currNotes, setNotes] = useState<Note[]>([]);
  const [editContent, setEditContent] = useState<{ [key: number]: string }>({});
  const [editing, setEditing] = useState<{ [key: number]: boolean }>({});
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const start = (currPage - 1) * NOTES_NUMBER;
    const end = currPage * NOTES_NUMBER;
    const fetchPosts = async () => {
      const response = await axios.get(`${API_URL}?_start=${start}&_end=${end}`);
      setNotes(response.data);
    };
    fetchPosts();
  }, [currPage]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotes(currNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      await axios.put(`${API_URL}/${id}`, { content: editContent[id] });
      setNotes(currNotes.map(note => note.id === id ? { ...note, content: editContent[id] } : note));
      setEditing({ ...editing, [id]: false });
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  const handleChange = (id: number, content: string) => {
    setEditContent({
      ...editContent,
      [id]: content,
    });
  };

  const handleCancel = (id: number) => {
    setEditing({ ...editing, [id]: false });
  };

  const handleStartEdit = (id: number) => {
    setEditing({ ...editing, [id]: true });
    setEditContent({ ...editContent, [id]: currNotes.find(note => note.id === id)?.content || '' });
  };

  return (
    <div className={`Notes ${theme}`}>
      <h1>Notes</h1>
      {currNotes.map(note => (
        <div key={note.id} className="note" id={`${note.id}`}>
          <p>Note ID: {note.id}</p>
          <h2>{note.title}</h2>
          <h6>Author: {note.author.name}</h6>
          <h6>Author's email: {note.author.email}</h6>
          <br />
          {editing[note.id] ? (
            <>
              <input
                type="text"
                name={`text_input-${note.id}`}
                value={editContent[note.id] || ''}
                onChange={(e) => handleChange(note.id, e.target.value)}
              />
              <button name={`text_input_save-${note.id}`} onClick={() => handleEdit(note.id)}>Save</button>
              <button name={`text_input_cancel-${note.id}`} onClick={() => handleCancel(note.id)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{note.content}</p>
              <button name={`edit-${note.id}`} onClick={() => handleStartEdit(note.id)}>Edit</button>
            </>
          )}
          <button name={`delete-${note.id}`} onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Notes;
