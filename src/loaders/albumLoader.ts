interface LoaderParams {
  params: {
    userId: string;
    albumId: string;
  };
}

export async function albumLoader({ params }: LoaderParams) {
  const [albumResponse, photosResponse, userResponse] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${params.albumId}`),
    fetch(`https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`),
    fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
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