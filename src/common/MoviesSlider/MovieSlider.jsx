import React from 'react';
import Carousel from 'react-multi-carousel';
import MovieCard from '../MovieCard/MovieCard';
import 'react-multi-carousel/lib/styles.css';
import './MovieSlider.style.css';

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div className="movie-slider-block">
      <h3 className="slide-tit">{title}</h3>

      <Carousel
        responsive={responsive}
        infinite={true}
        arrows
        partialVisible={true}
        partialVisibilityGutter={40}
        containerClass="custom-carousel-container"
        itemClass="carousel-item-padding"
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default MovieSlider;
