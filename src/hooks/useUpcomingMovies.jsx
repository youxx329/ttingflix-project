// hooks/useUpcomingMovies.js
import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useUpcomingMoviesQuery = () =>
  useQuery(['movie', 'upcoming'], () =>
    api.get('/movie/upcoming').then((res) => res.data)
  );
