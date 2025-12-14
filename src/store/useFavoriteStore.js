import { create } from "zustand";

export const useFavoriteStore = create((set, get) => ({
  FavoriteBooks: JSON.parse(localStorage.getItem("favoriteBooks")) || [],
  FavoriteLibrarys: JSON.parse(localStorage.getItem("favoriteLibraries")) || [],

  toggleBookToFavorite: (book) => {
    const FavoriteBooks = get().FavoriteBooks;

    const inFavorite = FavoriteBooks.find((el) => el.id === book.id);
    let updatedFavorites;

    if (inFavorite) {
      updatedFavorites = FavoriteBooks.filter((el) => el.id !== book.id);
    } else {
      updatedFavorites = [book, ...FavoriteBooks];
    }

    set({ FavoriteBooks: updatedFavorites });
    localStorage.setItem("favoriteBooks", JSON.stringify(updatedFavorites));
  },

  toggleLibraryToFavorite: (library) => {
    const FavoriteLibrarys = get().FavoriteLibrarys;

    const inFavorite = FavoriteLibrarys.find((el) => el.id === library.id);
    let updatedFavorites;

    if (inFavorite) {
      updatedFavorites = FavoriteLibrarys.filter((el) => el.id !== library.id);
    } else {
      updatedFavorites = [library, ...FavoriteLibrarys];
    }

    set({ FavoriteLibrarys: updatedFavorites });
    localStorage.setItem("favoriteLibraries", JSON.stringify(updatedFavorites));
  },
}));
