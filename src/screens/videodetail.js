import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './videodetail.css';


const VideoDetail = ({ videos }) => {
  const { id } = useParams();
  const video = videos.find((video) => video.id === parseInt(id));
  const [liked, setLiked] = useState(false);
  const [shareOptionsVisible, setShareOptionsVisible] = useState(false);
  const [comments, setComments] = useState([
    { id: 1, text: 'Great video!' },
    { id: 2, text: 'Thanks for sharing.' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState('');

  if (!video) {
    return <div>Video not found</div>;
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment }]);
      setNewComment('');
    }
  };

  const handleEditComment = (id) => {
    const comment = comments.find((comment) => comment.id === id);
    setEditingComment(id);
    setEditText(comment.text);
  };

  const handleSaveEdit = (id) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, text: editText } : comment
    ));
    setEditingComment(null);
    setEditText('');
  };

  const handleDeleteComment = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleShareOptions = () => {
    setShareOptionsVisible(!shareOptionsVisible);
  };

  return (
    <div className="video-detail-container">
      <video controls width="640" height="480">
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h3>{video.title}</h3>
      <p>{video.description}</p>
      <div className="interaction-buttons">
        <button className={liked ? 'liked' : ''} onClick={toggleLike}>
          {liked ? 'Liked' : 'Like'}
        </button>
        <button onClick={toggleShareOptions}>Share</button>
        {shareOptionsVisible && (
          <div className="share-options">
            <button onClick={() => alert('Shared on Facebook!')}>Facebook</button>
            <button onClick={() => alert('Shared on Twitter!')}>Twitter</button>
            <button onClick={() => alert('Shared on LinkedIn!')}>LinkedIn</button>
          </div>
        )}
      </div>
      <div className="comments-section">
        <h4>Comments</h4>
        <div className="add-comment">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
          />
          <button onClick={handleAddComment}>Add</button>
        </div>
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              {editingComment === comment.id ? (
                <>
                  <input 
                    type="text" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                  />
                  <button onClick={() => handleSaveEdit(comment.id)}>Save</button>
                </>
              ) : (
                <>
                  <p>{comment.text}</p>
                  <button onClick={() => handleEditComment(comment.id)}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
