export async function postLoader({ params }) {
  const [postResponse, commentsResponse, userResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`),
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`),
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
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