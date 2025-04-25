import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useMovieVideosQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-videos', movieId],
    queryFn: async () => {
      const res = await api.get(`/movie/${movieId}/videos`);
      return res.data;
    },
    enabled: !!movieId,
  });
};
