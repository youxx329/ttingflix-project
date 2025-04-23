import React, { useState, useEffect } from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import TopRatedSlide from '../Homepage/components/TopRatedMovieSlide/TopRatedMovieSlide';
import './MoviePage.style.css';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌
// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭 할 때마다 page 바꿔주기
// page 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get('q');
  useEffect(() => {
    setPage(1);
  }, [keyword]); // keyword 바뀌면 1페이지로 초기화하기
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });
  // console.log('총 페이지 수:', data.total_pages);

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  const hasResults = data?.results?.length > 0;
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div className="content-wrap">
      {keyword && !hasResults ? (
        <div className="no-result-box">
          <h5>“{keyword}” 작품은 없습니다. 대신 이런 작품들은 어떠세요?</h5>
          <TopRatedSlide />
        </div>
      ) : (
        <div className="movie-list">
          {data?.results.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      )}
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages} // 전체 페이지가 몇개인지지
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
    </div>
  );
};

export default MoviePage;
