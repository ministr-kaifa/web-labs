import { Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import { Userspage } from './pages/Userspage';
import { Userpage } from './pages/Userpage';
import { Aboutpage } from './pages/Aboutpage';
import { Homepage } from './pages/Homepage';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await fetch('https://jsonplaceholder.typicode.com/users');
        const fetchedUsers = await api.json();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/about">About</Link>
      </header>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/users" element={<Userspage users={users}/>} />
        <Route path="/users/:id" element={<Userpage/>} />
        <Route path="/about" element={<Aboutpage />} />
      </Routes>
    </>
  );
}

export default App;