import { useLoaderData, Link } from 'react-router-dom';
import { useFavorites } from '../store/favorites';
import './Post.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: {
    id: number;
    username: string;
  };
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostData {
  post: Post;
  comments: Comment[];
}

function Post() {
  const { post, comments } = useLoaderData() as PostData;
  const addFavoritePost = useFavorites((state) => state.addFavoritePost);
  const removeFavoritePost = useFavorites((state) => state.removeFavoritePost);
  const isPostFavorite = useFavorites((state) => state.isPostFavorite);

  const toggleFavorite = () => {
    if (isPostFavorite(post.id)) {
      removeFavoritePost(post.id);
    } else {
      addFavoritePost(post);
    }
  };

  return (
    <div className="post-detail">
      <div className="post">
        <div className="post-header">
          <h1>{post.title}</h1>
          <button 
            className={`favorite-button ${isPostFavorite(post.id) ? 'active' : ''}`}
            onClick={toggleFavorite}
            aria-label={isPostFavorite(post.id) ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          >
            ♥
          </button>
        </div>
        <Link to={`/users/${post.userId}`} className="author">
          Yazar: {post.user.username}
        </Link>
        <p className="post-body">{post.body}</p>
      </div>

      <div className="comments">
        <h2>Yorumlar</h2>
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            <h3>{comment.name}</h3>
            <p className="comment-email">{comment.email}</p>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;