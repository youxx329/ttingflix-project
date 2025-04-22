import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import { responsive } from '../../../../constants/responsive';
import MovieSlider from '../../../../common/MoviesSlider/MovieSlider';
import './PopularMovieSlide.style.css'

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>{error.message}</div>;

  // console.log(data.results);
  

  return (
    <div className='movie-slide'>
      <MovieSlider
        title="Popular Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default PopularMovieSlide;
