"use client";

import { useContext ,useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './pagination';
import Notes from './curr_page';
import './styles.css';
import AddNoteForm from './AddNoteForm';
import { ThemeContext } from './ThemeContext';

const NOTES_NUMBER = 10;
const API_URL = 'http://localhost:3001/notes';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLight, setIsLight] = useState(true);
  const theme = isLight ? "light" : "dark";




  const fetchTotalCount = async () => {
    const response = await axios.get(`${API_URL}/counts?_limit=${NOTES_NUMBER}`);
    const totalCount = response.data.count;
    setTotalPages(Math.ceil(totalCount / NOTES_NUMBER));
  };

  const themeCheckBox = () => {
    return (
        <label>
                <input
                    name = "change_theme"
                    type = "checkbox"
                    checked = {isLight}
                    onChange = { e => {setIsLight(e.target.checked)} }
                /> change theme
            </label>
    )
}

  useEffect(() => {
    fetchTotalCount();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNoteAdded = () => {
    fetchTotalCount();
    setCurrentPage(1);
  };

  return (
    <ThemeContext.Provider value={theme} >
        <div>
        {themeCheckBox()}
        <AddNoteForm onNoteAdded={handleNoteAdded} />
        <Notes currentPage={currentPage} />
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
        </div>
    </ThemeContext.Provider>
  );
};

export default App;
