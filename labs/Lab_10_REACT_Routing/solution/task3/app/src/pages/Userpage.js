import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

const Userpage = () => {
  const {id} = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
        const fetchedUser = await api.json();
        setUser(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (Object.keys(user).length? 
    <div>
      <p>id: {user.id}</p>
      <p>Full name: {user.name}</p>
    </div> :
    <p>User not found</p>
  );
};

export { Userpage };
