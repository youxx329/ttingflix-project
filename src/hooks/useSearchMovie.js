import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({keyword, page, genreId }) => {
  if (keyword) {
    return api.get(`/search/movie?query=${keyword}&page=${page}`);
  } else if (genreId) {
    return api.get(`/discover/movie?with_genres=${genreId}&page=${page}`);
  } else {
    return api.get(`/movie/popular?page=${page}`);
  }
}

export const useSearchMovieQuery = ({keyword, page}) => {
  return useQuery({
    queryKey:['movie-search', {keyword, page}],
    queryFn:()=>fetchSearchMovie({keyword , page}),
    select: (result) => ({
      ...result.data,
      total_pages: Math.min(result.data.total_pages, 500) // TMDB 제한
    })
  })
}