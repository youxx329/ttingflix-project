import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useTopRatedMoviesQuery = () =>
  useQuery(['movie', 'topRated'], () =>
    api.get('/movie/top_rated').then((res) => res.data)
  );