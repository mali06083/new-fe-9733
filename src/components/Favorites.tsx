import { Link } from 'react-router-dom';
import { useFavorites } from '../store/favorites';
import './Favorites.css';

function Favorites() {
  const photos = useFavorites((state) => state.photos);
  const removeFavoritePhoto = useFavorites((state) => state.removeFavoritePhoto);

  if (photos.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>Henüz favori fotoğrafınız bulunmuyor</h2>
        <p>Albümlerdeki fotoğrafları favorilerinize ekleyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>Favori Fotoğraflarım ({photos.length})</h1>
      <div className="favorites-grid">
        {photos.map(photo => (
          <div key={photo.id} className="favorite-card">
            <div className="favorite-actions">
              <button
                className="remove-favorite"
                onClick={() => removeFavoritePhoto(photo.id)}
                aria-label="Favorilerden kaldır"
              >
                ❌
              </button>
            </div>
            <Link to={`/users/${photo.userId}/albums/${photo.albumId}`}>
              <div className="photo-container">
                <img src={photo.url} alt={photo.title} />
              </div>
              <p className="photo-title">{photo.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites; 