import React, { JSX, useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './header.css';

export default function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header-container">
      <div className="logo">
        <h2>LOGO</h2>
      </div>

      <div className="account-container">
        <button className="avatar-button" onClick={toggleMenu}>
          <div className="avatar"></div>
        </button>

        {isMenuOpen && (
          <div className="dropdown-menu">
            <div className="menu-item">
              <ExitToAppIcon className='menu-icon'/>
              <span className="menu-text">Выход</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}