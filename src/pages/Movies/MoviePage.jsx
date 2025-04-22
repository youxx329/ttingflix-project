import React from 'react';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import { useSearchParams } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import TopRatedSlide from '../Homepage/components/TopRatedMovieSlide/TopRatedMovieSlide';
import './MoviePage.style.css';

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌
// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭 할 때마다 page 바꿔주기
// page 값이 바뀔 때 마다 useSearchMovie에 page까지 넣어서 fetch

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const keyword = query.get('q');
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword });
  // console.log(data);
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
    </div>
  );
};

export default MoviePage;
