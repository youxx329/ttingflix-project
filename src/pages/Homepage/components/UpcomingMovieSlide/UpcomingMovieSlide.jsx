// components/TopRatedSlide.jsx
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import MovieCard from '../MovieCard/MovieCard';
import './UpcomingMovieSlide.style.css';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 6 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const TopRatedSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  const hasResults = data?.results?.length > 0;

  return (
    <div>
      <h3>Top Rated Movies</h3>
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

export default TopRatedSlide;
