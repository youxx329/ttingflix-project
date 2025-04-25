import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import GenreDropdown from '../Homepage/components/GenreDropdown/GenreDropdown';
import ReactPaginate from 'react-paginate';
import TopRatedMovieSlide from '../Homepage/components/TopRatedMovieSlide/TopRatedMovieSlide.jsx';
import { useSearchMovieQuery } from '../../hooks/useSearchMovieQuery';
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  // 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword, selectedGenre]);

  // 장르 ID를 설정하기 전에는 쿼리 비활성화
  const shouldFetch = keyword || selectedGenre?.id;

  // API 호출
  const { data, isLoading, isError, error } = useSearchMovieQuery(
    {
      keyword,
      genreId: selectedGenre?.id,
      page,
    },
    {
      enabled: !!shouldFetch, // 값이 없으면 요청 보내지 않음
    }
  );
  console.log('🎯 API 응답 데이터:', data);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPage(1); // 장르 바꾸면 1페이지로
    // console.log('선택된 장르:', genre);
  };
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const hasResults = data?.results && data.results.length > 0;

  const filteredMovies =
    selectedGenre && data?.results
      ? data.results.filter((movie) => movie.genre_ids.includes(selectedGenre))
      : data?.results || [];
  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div className="content-wrap">
      <GenreDropdown onSelectGenre={handleGenreSelect} />
      {isLoading ? (
        <h1>Loading....</h1>
      ) : isError ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : !hasResults ? (
        <div className="no-result-box">
          <h5>
            {keyword
              ? `“${keyword}” 작품은 없습니다. 대신 이런 작품들은 어떠세요?`
              : '해당 장르에 작품이 없습니다.'}
          </h5>
          <TopRatedMovieSlide />
        </div>
      ) : (
        <>
          <div className="movie-list">
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.min(data?.total_pages || 1, 500)}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </>
      )}
    </div>
  );
};

export default MoviePage;
