export const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1,
    partialVisibilityGutter: 40, // 👈 여기도 넣으면 명확
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    // slidesToSlide: 1,
  },
};
