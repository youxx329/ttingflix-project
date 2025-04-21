import React from 'react';
import './MovieSlider.style.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({ title, movies, responsive }) => {
  const hasResults = movies?.length > 0;
  return (
    <div>
      <h3>{title}</h3>
      {hasResults ? (
        <Carousel
          infinite={true}
          centerMode={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          responsive={responsive}
        >
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Carousel>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default MovieSlider;
