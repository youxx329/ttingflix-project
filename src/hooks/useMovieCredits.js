import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useMovieCreditsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie', 'credits', movieId],
    queryFn: () => api.get(`/movie/${movieId}/credits`).then(res => res.data),
    enabled: !!movieId,
  });
};
