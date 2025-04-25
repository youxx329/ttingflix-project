import React, { useEffect, useRef, useState } from 'react';
import './GenreDropdown.style.css';
import { useMovieGenreQuery } from '../../../../hooks/useMovieGenreQuery';

const GenreDropdown = ({ onSelectGenre }) => {
  const { data } = useMovieGenreQuery();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="genre-dropdown-container">
      <button onClick={() => setIsOpen(!isOpen)} className="genre-toggle-btn">
        장르 ▾
      </button>
      {isOpen && (
        <div className="genre-list">
          {data?.genres.map((genre) => (
            <div
              key={genre.id}
              className="genre-item"
              onClick={() => {
                onSelectGenre(genre); // 장르 id 넘기기기
                setIsOpen(false);
              }}
            >
              {genre.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreDropdown;
