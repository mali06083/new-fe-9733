import { LoaderFunctionArgs } from 'react-router-dom';

export async function usersLoader() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  return { users };
}

export async function userLoader({ params }: LoaderFunctionArgs) {
  const { userId } = params;
  
  const [userResponse, postsResponse, albumsResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
  ]);

  const [user, posts, albums] = await Promise.all([
    userResponse.json(),
    postsResponse.json(),
    albumsResponse.json()
  ]);

  return {
    user,
    posts,
    albums
  };
} 