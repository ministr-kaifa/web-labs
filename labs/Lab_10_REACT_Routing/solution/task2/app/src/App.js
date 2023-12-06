import { Routes, Route, Link } from 'react-router-dom';

import { Homepage } from './pages/Homepage';
import { Aboutpage } from './pages/Aboutpage';
import { Notfoundpage } from './pages/Notfoundpage';

function App() {
  let users = [
    {id: 1, name: "username1"},
    {id: 2, name: "username2"},
    {id: 3, name: "username3"},
    {id: 4, name: "username4"},
    {id: 5, name: "username5"},
    {id: 6, name: "username6"}
  ]
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </header>
      <Routes>
        <Route path="/" element={<Homepage users={users}/>} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="*" element={<Notfoundpage />} />
      </Routes>
    </>
  );
}

export default App;