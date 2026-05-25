import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h1 className="leading-none text-3xl text-orange-900">Pynapple Share</h1>
        
        {/* Hamburger menu button for small screens */}
        <div className="md:hidden">
          <button
            className="text-orange-900 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <svg
              className="h-8 w-8 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={`${isOpen ? 'hidden' : 'block'}`}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
              <path
                className={`${isOpen ? 'block' : 'hidden'}`}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 3h22v2H1V3zm0 6h22v2H1V9zm0 6h22v2H1v-2z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown menu for navigation links on smaller screens */}
      <div className={`md:hidden absolute top-0 right-0 w-48 bg-white z-50 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="flex flex-col items-start py-2">
          <Link to="/" className="block px-4 py-2 text-orange-900 hover:text-blue-500">Home</Link>
          <Link to="/features" className="block px-4 py-2 text-orange-900 hover:text-blue-500">Features</Link>
          <Link to="/about" className="block px-4 py-2 text-orange-900 hover:text-blue-500">About</Link>
        </div>
      </div>

      {/* Regular navigation links for larger screens */}
      <nav className="hidden md:flex md:items-center">
        <ul className="list-reset md:flex md:items-center">
          <li><Link to="/" className="block md:inline-block mt-4 md:mt-0 mr-6 text-gray-900 hover:text-blue-500">Home</Link></li>
          <li><Link to="/features" className="block md:inline-block mt-4 md:mt-0 mr-6 text-gray-900 hover:text-blue-500">Features</Link></li>
          <li><Link to="/about" className="block md:inline-block mt-4 md:mt-0 text-gray-900 hover:text-blue-500">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default LandingNavbar;
