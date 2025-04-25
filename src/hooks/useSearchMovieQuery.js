import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchMovie = ({ keyword, page, genreId }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else if (genreId) {
    return api.get(`/discover/movie?with_genres=${genreId}&page=${page}`);
  } else {
    return api.get(`/movie/popular?page=${page}`);
  }
};

export const useSearchMovieQuery = ({ keyword, genreId, page }) => {
  return useQuery({
    queryKey: ['movie-search', { keyword, genreId, page }],
    queryFn: () => fetchSearchMovie({ keyword, page, genreId }),
    select: (res) => res.data,
    enabled: true, // ✅ 항상 true로!
  });
};
