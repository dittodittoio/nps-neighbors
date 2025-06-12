import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md' : 'bg-transparent'
      }`}>
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
                <img src="/Ditto-Logo-Dark-BG.png" alt="Ditto Logo" className="h-[50px] max-h-[50px] mx-auto object-contain" />
              </Link>
            </div>
            <div className="hidden md:block">
              <button
                onClick={() => setShowModal(true)}
                className="bg-white text-black font-textured px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                SHARE #PARKNEIGHBOR
              </button>
            </div>
            <div className="md:hidden">
              <button
                className="text-white"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                setShowModal(true);
                setMobileMenuOpen(false);
              }}
              className="bg-white text-black font-textured px-6 py-2 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg mt-4"
            >
              SHARE #PARKNEIGHBOR
            </button>
          </nav>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div
            className="rounded-xl shadow-2xl p-4 max-w-xs w-full relative flex flex-col items-center"
            style={{
              background: '#c29248',
              border: '8px solid #000',
            }}
          >
            <button
              className="absolute right-2 top-2 text-black text-3xl font-extrabold hover:text-red-700 transition"
              onClick={() => setShowModal(false)}
              aria-label="Close"
              style={{ lineHeight: 1 }}
            >
              &times;
            </button>
            <h2 className="text-xl font-heading mb-1 text-center text-black font-bold">
              Your Parks, Your Story
            </h2>
            <p className="text-center text-black mb-2 text-sm">
              Share the Campaign with your Network
            </p>
            <div className="w-full flex flex-col items-center mb-2">
              <div
                className="relative w-full"
                style={{
                  aspectRatio: "9/16",
                  maxWidth: "180px",
                  margin: "0 auto",
                }}
              >
                <video
                  src="https://assets.dittoditto.io/campaigns/NationalParks/Videos/Ditto%20-%20A%20Promo.mp4"
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="rounded-lg bg-black w-full h-full object-contain"
                  poster="/Ditto-Logo-Dark-BG.png"
                  style={{ aspectRatio: "9/16", width: "100%", height: "100%" }}
                />
              </div>
              <a
                href="https://assets.dittoditto.io/campaigns/NationalParks/Videos/Ditto%20-%20A%20Promo.mp4"
                download
                className="mt-2 bg-white text-black px-3 py-1 rounded font-body font-bold text-center shadow hover:bg-gray-200 transition text-xs"
              >
                Download Video
              </a>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <a
                href={`https://twitter.com/intent/tweet?text=Check out this National Park campaign! https://parkneighbor.dittoditto.io #Parkneighbor`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-3 py-1 rounded font-body font-bold text-center text-xs"
              >
                Share on Twitter/X
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=https://parkneighbor.dittoditto.io`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white px-3 py-1 rounded font-body font-bold text-center text-xs"
              >
                Share on Facebook
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;