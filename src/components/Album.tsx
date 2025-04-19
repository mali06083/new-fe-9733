import { useLoaderData, Link } from 'react-router-dom';
import { useFavorites } from '../store/favorites';
import './Album.css';

interface Album {
  userId: number;
  id: number;
  title: string;
  user: {
    id: number;
    username: string;
  };
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface AlbumData {
  album: Album;
  photos: Photo[];
}

function Album() {
  const { album, photos } = useLoaderData() as AlbumData;
  const addFavoritePhoto = useFavorites((state) => state.addFavoritePhoto);
  const removeFavoritePhoto = useFavorites((state) => state.removeFavoritePhoto);
  const isPhotoFavorite = useFavorites((state) => state.isPhotoFavorite);

  const toggleFavorite = (photo: Photo) => {
    const photoWithUserId = {
      ...photo,
      userId: album.userId
    };
    
    if (isPhotoFavorite(photo.id)) {
      removeFavoritePhoto(photo.id);
    } else {
      addFavoritePhoto(photoWithUserId, album.userId);
    }
  };

  return (
    <div className="album-detail">
      <div className="album-header">
        <h1>{album.title}</h1>
        <Link to={`/users/${album.userId}`} className="author">
          Sahibi: {album.user.username}
        </Link>
      </div>

      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <div className="photo-header">
              <button 
                className={`favorite-button ${isPhotoFavorite(photo.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(photo)}
                aria-label={isPhotoFavorite(photo.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
              >
                ♥
              </button>
            </div>
            <img src={photo.url} alt={photo.title} />
            <p className="photo-title">{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Album; 