import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieGenre = () => {
  return api.get(`/genre/movie/list`);
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ['movie-genres'],
    queryFn: () =>
      api.get('/genre/movie/list').then((res) => res.data), // 꼭 res.data로!
    staleTime: 300000, // 5분
  });
};