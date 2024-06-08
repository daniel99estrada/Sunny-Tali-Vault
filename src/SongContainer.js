import React, { useState } from 'react';

const SongContainer = () => {
  const importAll = (r) => {
    let songs = [];
    r.keys().forEach((item, index) => {
      if (item.endsWith('.mp3')) {
        const fileName = item.replace('./', '').replace('.mp3', '');
        songs.push({ title: fileName, src: r(item) });
      }
    });
    return songs;
  };

  const songs = importAll(require.context('../Assets', false, /\.mp3$/));

  const [comments, setComments] = useState({});
  const [showComment, setShowComment] = useState({});
  const [likes, setLikes] = useState({});
  const [sendStatus, setSendStatus] = useState({});

  const handleCommentChange = (e, index) => {
    const newComments = { ...comments, [index]: e.target.value };
    setComments(newComments);
  };

  const handleCommentSubmit = (index, title) => {
    return () => {
      // Handle comment submission
      const comment = comments[index];
      const apiUrl = 'https://8cw0vycmri.execute-api.us-east-1.amazonaws.com/dev/like';
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          song_name: title,
          comment: comment,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API response:', data);
          // Handle API response as needed
        })
        .catch((error) => {
          console.error('Error calling API:', error);
          // Handle errors
        });

      // Clear the comment input
      const newComments = { ...comments, [index]: '' };
      setComments(newComments);

      // Update sendStatus to "Sent" and then back to "Send" after a delay
      const newSendStatus = { ...sendStatus, [index]: 'Sent' };
      setSendStatus(newSendStatus);
      setTimeout(() => {
        setSendStatus({ ...newSendStatus, [index]: 'Send' });
      }, 1500);
    };
  };

  const toggleCommentSection = (index) => {
    const newShowComment = { ...showComment, [index]: !showComment[index] };
    setShowComment(newShowComment);
  };

  const toggleLike = (index, title) => {
    // Handle like button click
    const apiUrl = 'https://8cw0vycmri.execute-api.us-east-1.amazonaws.com/dev/like';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        song_name: title,
        comment: 'like',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('API response:', data);
        // Handle API response as needed
      })
      .catch((error) => {
        console.error('Error calling API:', error);
        // Handle errors
      });

    // Update likes state
    const newLikes = { ...likes, [index]: !likes[index] };
    setLikes(newLikes);
  };

  return (
    <div className=" text-white" style={{ backgroundColor: '#FFF3EF' }}>
      {songs.map((song, index) => (
        <div className="p-4 rounded-xl m-8 shadow-md border-black border-4 " key={index} style={{ backgroundColor: '#FF86C8' }}>
          <div className="flex justify-between items-center ">
            <h3 className="text-xl px-2 font-gatwick font-bold mb-2 text-black">{song.title}</h3>
            <div className="flex items-center space-x-2">
              <button onClick={() => toggleLike(index, song.title)} className="text-2xl text-black">
                {likes[index] ? '♥' : '♡'}
              </button>
              <button onClick={() => toggleCommentSection(index)} className="text-2xl text-black">
                {showComment[index] ? '▲' : '▼'}
              </button>
            </div>
          </div>
          <div className="audio-container mb-2">
            <audio controls className="w-full ">
              <source src={song.src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          {showComment[index] && (
            <div className="comment-section mt-4 flex items-center space-x-2">
              <input
                type="text"
                value={comments[index] || ''}
                onChange={(e) => handleCommentChange(e, index)}
                placeholder="Add a comment"
                className="flex-grow p-2 border rounded-md text-black"
              />
              <button
                onClick={handleCommentSubmit(index, song.title)}
                className="bg-black text-white py-2 px-4 rounded-md"
              >
                {sendStatus[index] || 'Send'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SongContainer;
