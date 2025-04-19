import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Photo {
  id: number;
  albumId: number;
  userId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface FavoritesStore {
  photos: Photo[];
  posts: Post[];
  addFavoritePhoto: (photo: Photo, userId: number) => void;
  removeFavoritePhoto: (photoId: number) => void;
  isPhotoFavorite: (photoId: number) => boolean;
  addFavoritePost: (post: Post) => void;
  removeFavoritePost: (postId: number) => void;
  isPostFavorite: (postId: number) => boolean;
}

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      photos: [],
      posts: [],
      
      addFavoritePhoto: (photo, userId) => {
        set((state) => ({
          photos: [...state.photos, { ...photo, userId }]
        }));
      },
      
      removeFavoritePhoto: (photoId) => {
        set((state) => ({
          photos: state.photos.filter(photo => photo.id !== photoId)
        }));
      },
      
      isPhotoFavorite: (photoId) => {
        return get().photos.some(photo => photo.id === photoId);
      },

      addFavoritePost: (post) => {
        set((state) => ({
          posts: [...state.posts, post]
        }));
      },

      removeFavoritePost: (postId) => {
        set((state) => ({
          posts: state.posts.filter(post => post.id !== postId)
        }));
      },

      isPostFavorite: (postId) => {
        return get().posts.some(post => post.id === postId);
      }
    }),
    {
      name: 'favorites-storage',
    }
  )
); 