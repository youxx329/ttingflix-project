import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-reviews', movieId],
    queryFn: async () => {
      const res = await api.get(`/movie/${movieId}/reviews`, {
        params: {
          language: 'en-US',
        },
      });
      return res.data;
    },
    enabled: !!movieId,
  });
};
