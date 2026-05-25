import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

function NavBar() {
  const [darkToggle, setDarkToggle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDarkToggle = () => {
    setDarkToggle(!darkToggle);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("uid");
    window.location.href = "/";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="h-20 rounded-b-2xl bg-orange-600 flex items-center justify-between px-6 shadow-lg relative">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img
          src="/src/assets/FedExLogo.png"
          alt="Logo"
          className="rounded-full h-10 w-10 mr-3 border border-orange-300"
        />
        <div>
          <span className="text-white font-bold text-lg">Pynapple Share</span>
          <p className="text-sm text-white">Your File Sharing Companion</p>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-4">
        <Link
          to="/home"
          className="text-white text-sm font-medium border border-white rounded-full px-4 py-1 hover:bg-white hover:text-orange-800 transition duration-300 shadow-lg"
        >
          Home
        </Link>
        <Link
          to="/home/links"
          className="text-white text-sm font-medium border border-white rounded-full px-4 py-1 hover:bg-white hover:text-orange-800 transition duration-300 shadow-lg"
        >
          Links
        </Link>
        {/* <button
          onClick={handleDarkToggle}
          className="flex items-center justify-center h-10 w-10 text-center text-white text-sm font-medium border border-gray-700 bg-gray-600 rounded-full px-2 py-2 hover:bg-gray-700 hover:text-white transition duration-900 shadow-lg"
        >
          {darkToggle ? (
            <Sun className="h-5 w-5 text-yellow-300" />
          ) : (
            <Moon className="h-5 w-5 text-white" />
          )}
        </button> */}
        <button
          onClick={handleLogout}
          className="text-white text-sm font-medium border border-red-800 bg-red-700 rounded-full px-4 py-1 hover:bg-red-600 hover:from-red-600 hover:to-red-800 hover:text-white transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="flex md:hidden items-center">
        <div className="p-2">
          <button
            onClick={handleDarkToggle}
            className="flex items-center justify-center h-8 w-8 text-center text-white text-sm font-medium border border-gray-700 bg-gray-600 rounded-full px-2 py-2 hover:bg-gray-700 hover:text-white transition duration-900 shadow-lg"
          >
            {darkToggle ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
        <button
          onClick={toggleMenu}
          className="text-white text-sm font-medium border border-white rounded-full px-3 py-1 hover:bg-white hover:text-orange-800 transition duration-300 shadow-lg"
        >
          Menu
        </button>
        <motion.div
          initial={{
            scaleX: 0.1,
            scaleY: 0,
            opacity: 0,
            originX: 0.5,
            originY: 0,
          }}
          animate={{
            scaleX: menuOpen ? 1 : 0,
            scaleY: menuOpen ? 1 : 0,
            opacity: menuOpen ? 0.9 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute top-16 right-0 bg-white w-[calc(100%-2rem)] mx-4 mt-6 rounded-lg shadow-lg overflow-hidden`}
          style={{ transformOrigin: "50% 0%" }}
        >
          <div className="flex items-center justify-around p-4">
            <Link
              to="/home"
              className="text-gray-800 hover:bg-gray-200 transition duration-300 px-4 py-2 rounded-md relative"
            >
              Home
            </Link>

            <div className="h-10 border-l border-gray-300"></div>

            <Link
              to="/home/links"
              className="text-gray-800 hover:bg-gray-200 transition duration-300 px-4 py-2 rounded-md relative"
            >
              Links
            </Link>

            <div className="h-10 border-l border-gray-300"></div>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:bg-gray-200 transition duration-300 px-4 py-2 rounded-md relative"
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NavBar;
