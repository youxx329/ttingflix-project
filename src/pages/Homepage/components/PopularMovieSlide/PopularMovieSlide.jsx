import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './PopularMovieSlide.style.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
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
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  console.log('[디버깅] 전체 데이터:', data);

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>{error.message}</div>;

  const hasResults = data?.results?.length > 0;

  return (
    <div>
      <h3>Popular Movies</h3>
      {hasResults ? (
        <Carousel
          infinite={true}
          centerMode={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
          responsive={responsive}
        >
          {data.results.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Carousel>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default PopularMovieSlide;
