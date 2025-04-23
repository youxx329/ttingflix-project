import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie = ({keyword, page}) => {
  return keyword ? api.get(`/search/movie?query=${keyword}&page=${page}`):api.get(`/movie/popular?page=${page}`)
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