import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Userpage } from './Userpage';

const Userspage = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path=":id" element={<Userpage users={users} />} />
      </Routes>
    </div>
  );
};

export { Userspage };
