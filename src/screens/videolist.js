import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './videolist.css';





const VideoList = ({ videos }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkTheme, setDarkTheme] = useState(false);
  const navigate = useNavigate();

  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className={`video-list-container ${darkTheme ? 'dark' : 'light'}`}>
      <header>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={()=>navigate('/login')}>Login</button>
        <button onClick={() => navigate('/add')}>Add Video</button>
        <button onClick={toggleTheme}>
          {darkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        </button>
      </header>
      <aside className="left-menu">
        <ul>
          <li>Home</li>
          <li>Trending</li>
          <li>Subscriptions</li>
          <li>Library</li>
        </ul>
      </aside>
      <main>
        <div className="video-list">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-item" onClick={() => navigate(`/video/${video.id}`)}>
              <video 
                width="320" 
                height="240" 
                src={video.url} 
                muted 
                onClick={(e) => { 
                  e.preventDefault();
                  navigate(`/video/${video.id}`);
                }} 
              />
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VideoList;
