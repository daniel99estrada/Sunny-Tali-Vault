import React from 'react';
import SongContainer from './SongContainer';
import Header from './Header';

function App() {
  return (
    <div className="bg-slate" style={{ backgroundColor: '#FFF3EF' }}>
      <Header />
      <SongContainer />
    </div>
  );
}

export default App;
