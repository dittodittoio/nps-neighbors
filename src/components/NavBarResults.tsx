import React, { useState } from "react";
import { Link } from "react-router-dom";

type NavBarResultsProps = {
  onShareClick: () => void;
};

const NavBarResults: React.FC<NavBarResultsProps> = ({ onShareClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/campaign"
                className="text-white font-body text-sm hover:text-gray-300 transition-colors duration-200 tracking-wide"
              >
                THE CAMPAIGN
              </Link>
              <Link
                to="/explore-the-parks"
                className="text-white font-body text-sm hover:text-gray-300 transition-colors duration-200 tracking-wide"
              >
                EXPLORE THE PARKS
              </Link>
            </div>
            <div className="flex-1 md:flex-none text-center">
              <Link to="/">
                <img
                  src="/Ditto-Logo-Dark-BG.png"
                  alt="Ditto Logo"
                  className="h-[50px] max-h-[50px] mx-auto object-contain"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <button
                onClick={onShareClick}
                className="bg-white text-black font-textured px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                SHARE YOUR #PARKNEIGHBOR
              </button>
            </div>
            <div className="md:hidden">
              <button
                className="text-white"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <nav className="flex flex-col gap-8 text-2xl items-center">
            <Link
              to="/campaign"
              className="text-white font-body hover:text-gray-300 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              THE CAMPAIGN
            </Link>
            <Link
              to="/explore-the-parks"
              className="text-white font-body hover:text-gray-300 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              EXPLORE THE PARKS
            </Link>
            <button
              onClick={() => {
                onShareClick();
                setMobileMenuOpen(false);
              }}
              className="bg-white text-black font-textured px-6 py-2 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg mt-4"
            >
              SHARE YOUR #PARKNEIGHBOR
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default NavBarResults;