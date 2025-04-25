import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovieQuery } from '../../hooks/useSearchMovieQuery';
import MovieCard from '../../common/MovieCard/MovieCard';
import GenreDropdown from './components/GenreDropdown/GenreDropdown';
import ReactPaginate from 'react-paginate';
import TopRatedSlide from '../Homepage/components/TopRatedMovieSlide/TopRatedSlide';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);

  // 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword, selectedGenre]);

  // API 호출
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    genreId: selectedGenre?.id,
    page,
  });

  const handlePageClick = ({ selected }) => setPage(selected + 1);
  const hasResults = data?.results?.length > 0;

  return (
    <div className="content-wrap">
      <GenreDropdown
        selectedGenre={selectedGenre}
        onSelectGenre={(genre) => {
          setSelectedGenre(genre);
          setQuery({}); // 키워드 제거
        }}
      />

      {isLoading ? (
        <h1>Loading....</h1>
      ) : isError ? (
        <Alert variant="danger">{error.message}</Alert>
      ) : keyword && !hasResults ? (
        <div className="no-result-box">
          <h5>“{keyword}” 작품은 없습니다. 대신 이런 작품들은 어떠세요?</h5>
          <TopRatedSlide />
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
            pageCount={data?.total_pages || 1}
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
