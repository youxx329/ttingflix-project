import React from 'react';
import { Badge } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          'url(' + `https://image.tmdb.org/t/p/w500${movie.poster_path}` + ')',
      }}
    >
      <div>
        <h1>{movie.title}</h1>
        {movie.genre_ids.map((id) => (
          <Badge bg="danger">{id}</Badge>
        ))}
      </div>
      <div>
        <div> {movie.vote_average}</div>
        <div> {movie.popularity}</div>
        <div> {movie.adult ? 'over18' : 'under18'}</div>
      </div>
    </div>
  );
};

export default MovieCard;
