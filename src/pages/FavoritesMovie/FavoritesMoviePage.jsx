import { useFavoriteStore } from '../../store/useFavoriteStore';
import MovieCard from '../../common/MovieCard/MovieCard';
import './FavoritesMoviePage.style.css';

const FavoritesMoviePage = () => {
  const { favorites } = useFavoriteStore();

  return (
    <div className="content-wrap">
      {favorites.length === 0 ? (
        <p>아직 찜한 영화가 없어요!</p>
      ) : (
        <div className="movie-list">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesMoviePage;
