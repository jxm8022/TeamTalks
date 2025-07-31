import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions.json';
import './Home.css';

const Home = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  const filtered = questions
    .filter(q => q.title.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="home-container">
      <div className="center-content">
        <div className="logo">Team.Talks</div>
        <form className="search-form" onSubmit={e => e.preventDefault()}>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search TeamTalks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
        {search && (
          <ul className="search-results">
            {filtered.length === 0 && <li>No results found.</li>}
            {filtered.map(q => (
              <li
                key={q.id}
                className="search-result"
                onClick={() => navigate(`/question/${q.id}`)}
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                {q.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;