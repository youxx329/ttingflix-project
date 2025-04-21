import React from 'react';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import { responsive } from '../../../../constants/responsive';
import MovieSlider from '../../../../common/MoviesSlider/MovieSlider';

const TopRatedSlide = () => {
  const { data, isLoading, isError, error } = useUpcomingMoviesQuery();

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <div>
      <MovieSlider
        title="Up Coming Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopRatedSlide;
