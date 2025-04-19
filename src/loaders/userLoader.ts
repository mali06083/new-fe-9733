export async function usersLoader() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

export async function userLoader({ params }) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`);
  return response.json();
} 