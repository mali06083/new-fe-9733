import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Users from './Users';
import User from './components/User';
import Post from './components/Post';
import Album from './components/Album';
import Favorites from './components/Favorites';
import { usersLoader, userLoader } from './loaders/userLoader';
import { postLoader } from './loaders/postLoader';
import { albumLoader } from './loaders/albumLoader';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "users",
        element: <Users />,
        loader: usersLoader,
      },
      {
        path: "users/:userId",
        element: <User />,
        loader: userLoader,
      },
      {
        path: "users/:userId/posts/:postId",
        element: <Post />,
        loader: postLoader,
      },
      {
        path: "users/:userId/albums/:albumId",
        element: <Album />,
        loader: albumLoader,
      },
      {
        path: "favorites",
        element: <Favorites />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
