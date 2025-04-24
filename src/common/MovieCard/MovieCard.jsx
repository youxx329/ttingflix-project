import React from 'react';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';
import AddButton from '../AddButton/AddButton';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  const getAgeImageSrc = (movie) => {
    const isAdult = movie.adult;

    if (isAdult) return '/ratings/19.png';
    else return '/ratings/12.png'; // or ALL.png
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // 이벤트 버블링 막기
  };

  return (
    <div
      style={{
        backgroundImage:
          'url(' +
          `https://image.tmdb.org/t/p/original${movie.poster_path}` +
          ')',
      }}
      className="movie-card"
      onClick={handleCardClick}
    >
      <div className="overlay">
        <h1>{movie.title}</h1>

        <AddButton movie={movie} onClick={stopPropagation} />

        <div>
          <img
            src={getAgeImageSrc(movie)}
            alt="관람등급"
            className="age-rating-icon"
          />
        </div>
        <div className="movie-card-genre">
          {showGenre(movie.genre_ids).map((name, index) => (
            <div key={index} className="genre-style">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
