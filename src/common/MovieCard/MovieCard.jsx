import React from 'react';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';
import AddButton from '../AddButton/AddButton';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();

  const showGenre = (genreIdList) => {
    if (!genreData?.genres) return [];
    return genreIdList.map((id) => {
      const genreObj = genreData.genres.find((genre) => genre.id === id);
      return genreObj?.name || '';
    });
  };

  const getAgeImageSrc = (movie) => {
    const isAdult = movie.adult;
    return isAdult ? '/ratings/19.png' : '/ratings/12.png';
  };

  const genreNames = showGenre(movie.genre_ids);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="card-wrapper">
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
            {genreNames.map((name, index) => (
              <div key={index} className="genre-style">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
