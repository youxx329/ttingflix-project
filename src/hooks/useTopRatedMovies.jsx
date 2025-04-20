import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchTopRatedMovies = () => api.get('/movie/top_rated');

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie', 'topRated'],
    queryFn: fetchTopRatedMovies,
    select: (res) => res.data,
  });
};
