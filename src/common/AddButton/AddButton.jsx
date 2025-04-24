import { AiOutlinePlus } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';

import { useFavoriteStore } from '../../store/useFavoriteStore';
import './AddButton.style.css';

const AddButton = ({ movie }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const isLiked = favorites.some((item) => item.id === movie.id);

  const toggleFavorite = (e) => {
    e.stopPropagation(); // 상세페이지로 가는 클릭 막기
    isLiked ? removeFavorite(movie.id) : addFavorite(movie);
  };

  return (
    <button className="add-btn" onClick={toggleFavorite}>
      <span className="icon-wrapper">
        {isLiked ? <FaCheck /> : <AiOutlinePlus />}
      </span>
    </button>
  );
};

export default AddButton;
