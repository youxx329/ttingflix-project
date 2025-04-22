import React from 'react';
import { Badge } from 'react-bootstrap';
import './MovieCard.style.css';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery';
import AddButton from '../AddButton/AddButton';

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

  const getAgeImageSrc = (age) => {
    switch (age) {
      case 12:
        return '/src/common/MovieCard/imges/icon_ratings_KR_12_en.png';
      case 15:
        return '/src/common/MovieCard/imges/icon_ratings_KR_15_en.png';
      case 19:
        return '/src/common/MovieCard/imges/icon_ratings_KR_R_en.png';
      case 'ALL':
        return '/src/common/MovieCard/imges/icon_ratings_KR_All_en.png';
      default:
        return '/src/common/MovieCard/imges/icon_ratings_KR_All_en.png';
    }
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
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        <AddButton movie={movie} />
        <div>
          <img
            src={getAgeImageSrc(movie.age)}
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
