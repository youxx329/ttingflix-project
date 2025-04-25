import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useMovieDetailQuery } from '../../hooks/useMovieDetailQuery';
import './MovieDetailPage.style.css';
import { useMovieCreditsQuery } from '../../hooks/useMovieCredits';
import { useMovieReviewsQuery } from '../../hooks/useMovieReviewsQuery.js';
import { useMovieVideosQuery } from '../../hooks/useMovieVideosQuery.js';

import ReviewItem from './ReviewItem.jsx';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, isError, error } = useMovieDetailQuery(id);
  const { data: creditData, isLoading: creditLoading } =
    useMovieCreditsQuery(id);
  const { data: reviewsData, isLoading: reviewsLoading } =
    useMovieReviewsQuery(id);
  const getAgeImageSrc = (movie) => {
    const isAdult = movie.adult;

    if (isAdult) return '/ratings/19.png';
    else return '/ratings/12.png'; // or ALL.png
  };


const { data: videoData } = useMovieVideosQuery(id);

// 모달 상태
const [showModal, setShowModal] = useState(false);
const handleOpenModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);

// 유튜브 예고편 key 찾기
const trailer = videoData?.results?.find(
  (video) => video.type === 'Trailer' && video.site === 'YouTube'
);
const youtubeKey = trailer?.key;

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <div>{error.message}</div>;
  if (creditLoading) return <p>출연진 로딩중...</p>;

  return (
    <div className="detail-page">
      <div
        className="detail-banner"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="banner-content">
          <h1>{movie.title}</h1>
          <button className="play-button" onClick={handleOpenModal}>
            ▶ <span>재생</span>
          </button>

          <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
  <Modal.Body style={{ backgroundColor: 'black', padding: 0 }}>
    {youtubeKey ? (
      <YouTube
        videoId={youtubeKey}
        opts={{
          width: '100%',
          height: '400',
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    ) : (
      <div style={{ color: 'white', padding: '2rem' }}>
        예고편이 없습니다.
      </div>
    )}
  </Modal.Body>
</Modal>
        </div>
      </div>

      <div className="movie-info-section">
        <img
          className="movie-info-img"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="info-box">
          <h2>{movie.title}</h2>
          <p>
            <img
              src={getAgeImageSrc(movie)}
              alt="관람등급"
              className="age-rating-icon"
            />
          </p>
          <p className='info-overview'>{movie.overview}</p>
          <div className="cast-list">
            <strong>출연:</strong>
            {creditData.cast.slice(0, 3).map((person) => (
              <div key={person.name}>
                <p>
                  {person.name} ({person.character})
                </p>
              </div>
            ))}
          </div>
          <p>
            <strong>장르:</strong> {movie.genres.map((g) => g.name).join(', ')}
          </p>
          <p>
            <strong>평점:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>개봉일:</strong> {movie.release_date}
          </p>
          <p>
            <strong>러닝타임:</strong> {movie.runtime}분
          </p>
        </div>
      </div>

      <div className="review-section">
        <h3>Reviews</h3>
        {reviewsLoading ? (
          <p>리뷰 로딩중...</p>
        ) : (
          <div className="review-box">
            {reviewsData.results.length > 0 ? (
              reviewsData.results.map((review) => (
                <ReviewItem
                  key={review.id}
                  author={review.author}
                  content={review.content}
                />
              ))
            ) : (
              <p>리뷰가 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
