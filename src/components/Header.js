import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn }) => {
  return (
    <header>
      <h1>URL Shortener</h1>
      {isLoggedIn && (
        <Link to="/profile" className="header-icon">
          <img src="/path/to/user-icon.png" alt="User Profile" />
        </Link>
      )}
    </header>
  );
};

export default Header;
