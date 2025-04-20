import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchUpcomingMovies = () => api.get('/movie/upcoming');

export const useUpcomingMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie', 'upcoming'],
    queryFn: fetchUpcomingMovies,
    select: (res) => res.data,
  });
};
