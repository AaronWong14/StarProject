import React, { useState } from 'react';

const CreateStarPopup = ({ onClose, onSubmit }) => {
  const [starMessage, setStarMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(starMessage);
    setStarMessage('');
    onClose();
  };

  return (
    <div className="popup" style={{ position: 'absolute', top: '3%', right: '3%'}}>
      <div className="popup-inner" style={{ padding: '10px', backgroundColor: 'white', borderRadius: '5px' }}>
        <h2>Create a New Star</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Star Message:
            <input
                type="text"
                value={starMessage}
                onChange={(e) => setStarMessage(e.target.value)}
                required
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStarPopup;