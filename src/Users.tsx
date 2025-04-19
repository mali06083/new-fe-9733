
import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
}

function Users() {
  const users = useLoaderData() as User[];

  return (
    <div>
      <h1>USERS</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
