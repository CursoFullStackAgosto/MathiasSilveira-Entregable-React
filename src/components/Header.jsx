import React from 'react';
import { FaSearch, FaHome, FaTasks, FaInfoCircle } from 'react-icons/fa';

const Header = ({ setSearchQuery }) => (
  <header className="header">
    <div className="header-content">
      <div className="logo">
        <a href="#home" aria-label="Inicio">
          <FaHome size={40} />
        </a>
      </div>
      <h1 className="title">To-Do List</h1>
      <div className="right-section">
        <input
          type="text"
          placeholder="Buscar tareas..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <nav className="nav">
          <a href="#tasks" aria-label="Tasks">
            <FaTasks /> Tasks
          </a>
          <a href="#about" aria-label="About">
            <FaInfoCircle  /> About
          </a>
        </nav>
      </div>
    </div>
  </header>
);

export default Header;


