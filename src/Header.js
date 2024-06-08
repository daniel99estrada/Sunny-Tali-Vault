import React from 'react';
import logo1 from './wallpaper/1.png';

const Header = () => {
  return (
    <header className="bg-pink-500 text-8xl font-bold text-center py-10" style={{ backgroundColor: '#FFF3EF' }}>
      SUNNY TALI VAULT
      <div className="flex justify-center m-8">
        <img src={logo1} alt="Logo 1" className="w-auto h-40 mx-4" />
      </div>
    </header>
  );
};

export default Header;
