import React, { useState } from 'react';

const Song = ({ title, src}) => {

  return (
    <div className="bg-blue-800 rounded-lg shadow-lg mx-auto mt-5 border border-black text-white">
      <div className="p-4 mb-2 flex items-center justify-between">
        <div>
          <h2 className="">{title}</h2>
            <audio id="audioPlayer" className="hidden mb-2">
            <source src={src} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>

            <div className="custom-audio-controls">
            <button id="playPauseBtn">Play</button>
            <input type="range" id="seekSlider" value="0" max="100" />
            <span id="currentTime">0:00</span> / <span id="duration">0:00</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
