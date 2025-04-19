import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function User() {
  const user = useLoaderData() as User;
  const [activeTab, setActiveTab] = useState<'posts' | 'albums' | 'todos'>('posts');

  return (
    <div>
      <h1>{user.name}</h1>
      <div className="user-info">
        <p>Email: {user.email}</p>
        <p>Telefon: {user.phone}</p>
      </div>

      <div className="tabs">
        <button 
          className={activeTab === 'posts' ? 'active' : ''} 
          onClick={() => setActiveTab('posts')}
        >
          Gönderiler
        </button>
        <button 
          className={activeTab === 'albums' ? 'active' : ''} 
          onClick={() => setActiveTab('albums')}
        >
          Albümler
        </button>
        <button 
          className={activeTab === 'todos' ? 'active' : ''} 
          onClick={() => setActiveTab('todos')}
        >
          Yapılacaklar
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'posts' && <UserPosts userId={user.id} />}
        {activeTab === 'albums' && <UserAlbums userId={user.id} />}
        {activeTab === 'todos' && <UserTodos userId={user.id} />}
      </div>
    </div>
  );
}

function UserPosts({ userId }: { userId: number }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div className="loading">Gönderiler yükleniyor...</div>;
  }

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="post">
          <Link to={`/users/${userId}/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

function UserAlbums({ userId }: { userId: number }) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div className="loading">Albümler yükleniyor...</div>;
  }

  return (
    <div>
      {albums.map(album => (
        <div key={album.id} className="album">
          <Link to={`/users/${userId}/albums/${album.id}`}>
            <h3>{album.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

function UserTodos({ userId }: { userId: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  
  React.useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      .then(res => res.json())
      .then(data => {
        setTodos(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div className="loading">Yapılacaklar yükleniyor...</div>;
  }

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id} className="todo">
          <input type="checkbox" checked={todo.completed} readOnly />
          <span>{todo.title}</span>
        </div>
      ))}
    </div>
  );
}

export default User; 