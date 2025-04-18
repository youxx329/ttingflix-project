import './App.css';
import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import NotFoundPage from './NotFoundPage.jsx/NotFoundPage';
import Homepage from './pages/Homepage/Homepage';
import MovieDetailPage from './pages/MovieDetail/MovieDetailPage';
import MoviePage from './pages/Movies/MoviePage';

// 홈페이지 /
// 영화 전체 보여주는 페이지 (서치 기능) /movies
// 영화 디테일 페이지 /movies/:id

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {' '}
            // user화면
            <Route index element={<Homepage />} />
            <Route path="movies">
              <Route index element={<MoviePage />} />
              <Route path=":id" element={<MovieDetailPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
