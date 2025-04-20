import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const PopularMovieSlide = () => {
  const { data, isLoding, isError, error } = usePopularMoviesQuery();
  if (isLoding) {
    return <h1>Loding....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <h3>Popular Movies</h3>
      {data?.results?.length > 0 && (
        <Carousel
          infinite={true}
          centerMode={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          responsive={responsive}
        >
          {data.results.map((movie, index) => (
            <div key={index}>{movie.title}</div>
          ))}
        </Carousel>
      )}
      ;
    </div>
  );
};

export default PopularMovieSlide;
