import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useMovieReviewsQuery = (movieId) => {
  return useQuery({
    queryKey: ['movie-reviews', movieId],
    queryFn: async () => {
      const res = await api.get(`/movie/${movieId}/reviews`, {
        params: {
          language: 'en-US', // 한글 리뷰 없을 때 영어 리뷰 가져오기 
        },
      });
      return res.data;
    },
    enabled: !!movieId,
  });
};
