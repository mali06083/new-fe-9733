import { LoaderFunctionArgs } from 'react-router-dom';

export async function postLoader({ params }: LoaderFunctionArgs) {
  const { userId, postId } = params;
  
  const [postResponse, commentsResponse, userResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  ]);

  const [post, comments, user] = await Promise.all([
    postResponse.json(),
    commentsResponse.json(),
    userResponse.json()
  ]);

  return {
    post: { ...post, user: { id: user.id, username: user.username } },
    comments
  };
} 