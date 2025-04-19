import { Link, Outlet } from 'react-router-dom';
import { useFavorites } from '../store/favorites';
import './Layout.css';

function Layout() {
  const photos = useFavorites((state) => state.photos);
  const posts = useFavorites((state) => state.posts);

  const totalFavorites = photos.length + posts.length;

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-left">
            <Link to="/users" className="nav-brand">
              Users
            </Link>
           
          </div>
          <div className="nav-right">
            <Link to="/favorites" className="favorites-link">
              Favoriler
              {totalFavorites > 0 && (
                <span className="favorites-count">{totalFavorites}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout; 