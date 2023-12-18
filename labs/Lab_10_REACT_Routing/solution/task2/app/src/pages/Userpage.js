import React from 'react';
import {useParams} from 'react-router-dom';

const Userpage = ({ users }) => {
  const {id} = useParams();
  const user = users.find(user => user.id === parseInt(id));

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <p>id: {user.id}</p>
      <p>username: {user.name}</p>
    </div>
  );
};

export { Userpage };
