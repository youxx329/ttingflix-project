import { useState } from 'react';
import './ReviewItem.style.css';

const ReviewItem = ({ author, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const maxLength = 500; // 글자수 기준 접기/펼치기
  const shouldTruncate = content.length > maxLength;
  const displayedText =
    isExpanded || !shouldTruncate
      ? content
      : content.slice(0, maxLength) + '...';

  return (
    <div className="review-box">
      <p>
        <strong>{author}</strong>
      </p>
      <p>{displayedText}</p>
      {shouldTruncate && (
        <button className="toggle-btn" onClick={toggleExpand}>
          {isExpanded ? '접기 ▲' : '더보기 ▼'}
        </button>
      )}
    </div>
  );
};

export default ReviewItem;
