import { AiOutlinePlus } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

import { useFavoriteStore } from '../../store/useFavoriteStore';
import './AddButton.style.css';

const AddButton = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isLiked = favorites.some((item) => item.id === movie.id);

  const toggleFavorite = () => {
    isLiked ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <button className="add-btn" onClick={toggleFavorite}>
      {isLiked ? (
        <FaCheck size="24" color="#fff" />
      ) : (
        <AiOutlinePlus size="24" color="#fff" />
      )}
    </button>
  );
};

export default AddButton;
