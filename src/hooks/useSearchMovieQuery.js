import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

export const useSearchMovieQuery = ({
  keyword,
  genreId,
  sortBy = 'popularity.desc',
  page,
}) => {
  const queryKey = ['movie-search', { keyword, genreId, sortBy, page }];

  const queryFn = async () => {
    if (keyword) {
      return api
        .get(`/search/movie?query=${keyword}&page=${page}`)
        .then((res) => res.data);
    } else if (genreId) {
      return api
        .get(
          `/discover/movie?with_genres=${genreId}&sort_by=${sortBy}&page=${page}`
        )
        .then((res) => res.data);
    } else {
      return api
        .get(`/discover/movie?sort_by=${sortBy}&page=${page}`)
        .then((res) => res.data);
    }
  };

  return useQuery({ queryKey, queryFn, keepPreviousData: true });
};
