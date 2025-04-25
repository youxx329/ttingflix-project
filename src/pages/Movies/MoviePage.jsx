import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../../common/MovieCard/MovieCard';
import GenreDropdown from '../Homepage/components/GenreDropdown/GenreDropdown';
import ReactPaginate from 'react-paginate';
import TopRatedMovieSlide from '../Homepage/components/TopRatedMovieSlide/TopRatedMovieSlide.jsx';
import { useSearchMovieQuery } from '../../hooks/useSearchMovieQuery';
import { useMovieGenreQuery } from '../../hooks/useMovieGenreQuery'; // 장르 데이터 불러오기
import './MoviePage.style.css';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc'); // 인기순 기본값
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const { data: genreData } = useMovieGenreQuery(); // 장르 API 호출

  // 장르 토글
  const toggleGenreDropdown = (e) => {
    e.stopPropagation();
    setIsGenreOpen((prev) => !prev);
    setIsSortOpen(false);
  };

  // 인기순 토글
  const toggleSortDropdown = (e) => {
    e.stopPropagation();
    setIsSortOpen((prev) => !prev);
    setIsGenreOpen(false);
  };

  // 화면 밖 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = () => {
      setIsGenreOpen(false);
      setIsSortOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 장르 선택
  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setPage(1);
    setIsGenreOpen(false);
  };

  // 정렬 선택
  const handleSortChange = (order) => {
    setSortOrder(order);
    setPage(1);
    setIsSortOpen(false);
  };

  useEffect(() => {
    setPage(1);
  }, [keyword, selectedGenre, sortOrder]); // 정렬 바뀔 때도 1페이지로 초기화

  const shouldFetch = keyword || selectedGenre?.id;

  const { data, isLoading, isError, error } = useSearchMovieQuery(
    {
      keyword,
      genreId: selectedGenre?.id,
      sortBy: `popularity.${sortOrder}`,
      page,
    },
    {
      enabled: !!shouldFetch,
    }
  );

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const hasResults = data?.results && data.results.length > 0;

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div className="content-wrap">
      {/* 검색 결과가 있을 때만 필터바 보여주기 */}
      {hasResults && (
        <div className="filter-bar">
          {/* 장르 드롭다운 */}
          <div className="genre-dropdown-container">
            <button onClick={toggleGenreDropdown} className="genre-toggle-btn">
              장르 ▾
            </button>
            {isGenreOpen && (
              <div className="genre-list">
                {genreData?.genres.map((genre) => (
                  <div
                    key={genre.id}
                    className="genre-item"
                    onClick={() => handleGenreSelect(genre)}
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 인기순 드롭다운 */}
          <div className="sort-dropdown-container">
            <button onClick={toggleSortDropdown} className="sort-toggle-btn">
              인기순 ▾
            </button>
            {isSortOpen && (
              <div className="sort-options">
                <div
                  className="sort-item"
                  onClick={() => handleSortChange('desc')}
                >
                  인기 많은 순
                </div>
                <div
                  className="sort-item"
                  onClick={() => handleSortChange('asc')}
                >
                  인기 적은 순
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 영화 리스트 or No Result 메시지 */}
      {keyword && !hasResults ? (
        <div className="no-result-box">
          <h5>“{keyword}” 작품은 없습니다. 대신 이런 작품들은 어떠세요?</h5>
          <TopRatedMovieSlide />
        </div>
      ) : (
        <div className="movie-list">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {hasResults && (
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={(data?.total_pages || 1, 500)}
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
      )}
    </div>
  );
};

export default MoviePage;
