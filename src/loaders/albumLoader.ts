import { LoaderFunctionArgs } from 'react-router-dom';

export async function albumLoader({ params }: LoaderFunctionArgs) {
  const { userId, albumId } = params;
  
  const [albumResponse, photosResponse, userResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`),
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
  ]);

  const [album, photos, user] = await Promise.all([
    albumResponse.json(),
    photosResponse.json(),
    userResponse.json()
  ]);

  return {
    album: { ...album, user: { id: user.id, username: user.username } },
    photos
  };
} 