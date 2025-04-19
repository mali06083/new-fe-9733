import React, { createContext, useContext, useState } from 'react';

interface Photo {
  id: number;
  albumId: number;
  userId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface FavoritesContextType {
  favorites: Photo[];
  addFavorite: (photo: Photo, userId: number) => void;
  removeFavorite: (photoId: number) => void;
  isFavorite: (photoId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Photo[]>([]);

  const addFavorite = (photo: Photo, userId: number) => {
    setFavorites(prev => [...prev, { ...photo, userId }]);
  };

  const removeFavorite = (photoId: number) => {
    setFavorites(prev => prev.filter(photo => photo.id !== photoId));
  };

  const isFavorite = (photoId: number) => {
    return favorites.some(photo => photo.id === photoId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 