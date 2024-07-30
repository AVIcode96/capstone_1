// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Profile from './pages/Profile';
import { useAuth } from './contexts/AuthContext';
import './index.css';
import './pages/Home.css'; // Import your global styles

const App = () => {
  const { user, profileData } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={user ? <Todo profileData={profileData} /> : <Home />} />
      <Route path="/profile" element={user ? <Profile /> : <Home />} />
    </Routes>
  );
};

export default App;
