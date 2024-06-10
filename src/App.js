
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddVideo from './screens/addvideo';
import VideoList from './screens/videolist';
import VideoDetail from './screens/videodetail';
import React, { useState, useEffect } from 'react';
import Login from './screens/login';
import Register from './screens/register';


import './App.css';

const App = () => {
  const [videos, setVideos] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    fetch('/videos.json')
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  const addVideo = (newVideo) => {
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <Router>
      <div className={`App ${darkTheme ? 'dark' : 'light'}`}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/add">Add Video</Link>
          <button onClick={toggleTheme}>
            {darkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          </button>
        </nav>
        <Routes>

          <Route path="/" element={<VideoList videos={videos} />} />
          <Route path="/add" element={<AddVideo onAddVideo={addVideo} />} />
          <Route path="/video/:id" element={<VideoDetail videos={videos} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
