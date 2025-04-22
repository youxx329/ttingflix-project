import { create } from 'zustand';

export const useFavoriteStore = create((set) => ({
  favorites: [],
  addFavorite: (movie) =>
    set((state) => {
      if (state.favorites.some((item) => item.id === movie.id)) return state;
      return { favorites: [...state.favorites, movie] };
    }),
  removeFavorite: (movieId) =>
    set((state) => ({
      favorites: state.favorites.filter((movie) => movie.id !== movieId),
    })),
}));
