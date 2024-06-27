import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './videolist.css';
import defaultAvatar from '../logo.svg'; // Add a default avatar image in your project

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('token');
      if (!userId || !token) {
        setError('User not logged in');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/videos2', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('An error occurred while fetching videos.');
      }
    };

    fetchVideos();
  }, []); // Empty dependency array ensures useEffect runs only once

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  const incrementVideoViews = async (videoId, ownerId) => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    if (!userId || !token) {
      setError('User not logged in');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/users/${userId}/videos/${videoId}/increment-views`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error incrementing video views:', error);
      setError('An error occurred while incrementing video views.');
    }
  };

  const handleVideoClick = async (videoId, ownerId) => {
    await incrementVideoViews(videoId, ownerId);
    navigate(`/video/${videoId}/${ownerId}`);
  };

  return (
    <div className={`video-list-container ${darkTheme ? 'dark' : 'light'}`}>
      <header className="header">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {darkTheme ? 'Light Theme' : 'Dark Theme'}
        </button>
      </header>
      <aside className="left-menu">
        <div className="sidebar-buttons">
          <button onClick={() => navigate('/videolist')}>Home</button>
          <button onClick={() => navigate('/myvideos')}>My Videos</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/add')}>Add Video</button>
        </div>
      </aside>
      <main className="main-content">
        {error && <div className="error">{error}</div>}
        <div className="video-list">
          {filteredVideos.map((video) => (
            <div key={video._id} className="video-item" onClick={() => handleVideoClick(video._id, video.owner._id)}>
              <div className="video-thumbnail">
                <video src={video.url} muted />
              </div>
              <div className="video-details">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <span>{video.views} views</span>
                <div className="owner-details">
                  <img 
                    className="avatar" 
                    src={video.owner.picture || defaultAvatar} 
                  />
                  <p>{video.owner.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VideoList;
