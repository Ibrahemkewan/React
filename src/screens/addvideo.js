import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addvideo.css';

const AddVideo = ({ onAddVideo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newVideo = {
      id: Date.now(),
      title,
      description,
      url,
    };
    onAddVideo(newVideo);
    navigate('/');
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Add a New Video</h2>
        <input
          type="text"
          placeholder="Title"
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Video URL"
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="button">
          Add Video
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
 