// components/TopRatedSlide.jsx
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useUpcomingMoviesQuery } from '../../../hooks/useUpcomingMovies';

import MovieCard from '../MovieCard/MovieCard';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 8 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const TopRatedSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div>
      <h3>Top Rated Movies</h3>
      {data?.results?.length > 0 && (
        <Carousel responsive={responsive} infinite centerMode>
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default TopRatedSlide;
