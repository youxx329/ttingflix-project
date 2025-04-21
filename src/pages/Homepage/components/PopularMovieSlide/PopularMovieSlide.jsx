import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { responsive } from '../../../../constants/responsive';
import MovieSlider from '../../../../common/MoviesSlider/MovieSlider';

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
