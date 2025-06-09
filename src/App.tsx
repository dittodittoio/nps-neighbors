import React, { useState, useEffect } from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const videoList = [
  { name: "Acadia", file: "Acadia.mp4" },
  { name: "Arches", file: "Arches.mp4" },
  { name: "Bryce Canyon", file: "Bryce-Canyon.mp4" },
  { name: "Castillo de San Felipe del Morro", file: "Castillo-SanFelipe.mp4" },
  { name: "Crater Lake", file: "Crater-Lake.mp4" },
  { name: "Gateway Arch", file: "Gateway-Arch.mp4" },
  { name: "Gettysburg Memorial", file: "Gettysburg-Memorial.mp4" },
  { name: "Independence Hall", file: "Independence-Hall.mp4" },
  { name: "Joshua Tree", file: "Joshua-Tree.mp4" },
  { name: "Martin Luther King Jr. Memorial", file: "Martin-L.mp4" },
  { name: "Misión Concepción", file: "Mision-Concepcion.mp4" },
  { name: "Mount Rushmore", file: "Rushmore.mp4" },
  { name: "Statue of Liberty", file: "Statue-Liberty.mp4" },
  { name: "Yellowstone", file: "Yellowstone.mp4" },
  { name: "Yosemite", file: "Yosemite.mp4" },
  { name: "Zion", file: "Zion.mp4" },
];

function App() {
  const [currentVideo, setCurrentVideo] = useState(videoList[0]);
  const [zipCode, setZipCode] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Randomly select a video on component mount
    const randomIndex = Math.floor(Math.random() * videoList.length);
    setCurrentVideo(videoList[randomIndex]);

    // Handle scroll effect for navigation
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ZIP code submission logic here
    console.log('ZIP code submitted:', zipCode);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const getStillImagePath = (filename: string) => {
    return `/videos/stills/${filename.replace('.mp4', '.png')}`;
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background Video or Fallback Image */}
      {!videoError ? (
        <video
          className="video-background"
          autoPlay
          muted
          loop
          playsInline
          onError={handleVideoError}
          key={currentVideo.file}
          poster={getStillImagePath(currentVideo.file)}
        >
          <source src={`/videos/${currentVideo.file}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="video-background bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${getStillImagePath(currentVideo.file)})`
          }}
        />
      )}

      {/* Video Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-40 z-0"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#campaign" 
                className="text-white font-body text-sm hover:text-gray-300 transition-colors duration-200 tracking-wide"
              >
                THE CAMPAIGN
              </a>
              <a 
                href="#explore" 
                className="text-white font-body text-sm hover:text-gray-300 transition-colors duration-200 tracking-wide"
              >
                EXPLORE THE PARKS
              </a>
            </div>

            {/* Center Logo */}
            <div className="flex-1 md:flex-none text-center">
              <h1 className="text-white font-heading text-2xl md:text-3xl font-bold tracking-wider">
                DITTO
              </h1>
            </div>

            {/* Right CTA Button */}
            <div className="hidden md:block">
              <button className="bg-white text-black font-textured px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                SHARE YOUR #PARKNEIGHBOR
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 border-t border-white border-opacity-20 pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#campaign" className="text-white font-body text-sm tracking-wide">
                THE CAMPAIGN
              </a>
              <a href="#explore" className="text-white font-body text-sm tracking-wide">
                EXPLORE THE PARKS
              </a>
              <button className="bg-white text-black font-textured px-4 py-2 rounded-full text-sm font-bold w-full">
                SHARE YOUR #PARKNEIGHBOR
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl">
            <h1 className="text-white font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              FIND YOUR NATIONAL PARK NEIGHBOR
            </h1>
            
            <p className="text-white font-body text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
              There are over 400 National Park sites across the U.S., and one is closer than you think.
            </p>

            {/* ZIP Code Form */}
            <form onSubmit={handleZipSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter your U.S. ZIP code"
                  className="w-full px-6 py-4 rounded-full text-center font-body text-lg bg-white bg-opacity-90 backdrop-blur-sm border-0 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 shadow-lg"
                  maxLength={5}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full font-textured text-sm font-bold hover:bg-gray-800 transition-all duration-200 shadow-md"
                >
                  FIND
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Content Section */}
        <div className="bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <p className="text-white font-body text-lg leading-relaxed opacity-90">
                  This summer, discover the National Park closest to you and show your support. These places have never mattered more. Parks and historical sites are living reflections of our history, culture, and community.
                </p>
              </div>
              <div>
                <p className="text-white font-body text-lg leading-relaxed opacity-90">
                  We're using Ditto, our data-powered storytelling platform, to lift them up and spotlight the neighborhoods they belong to.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black bg-opacity-80 backdrop-blur-sm border-t border-white border-opacity-20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white font-body text-sm opacity-75">
                Crafted by Ditto
              </div>
              
              <div className="flex items-center space-x-6">
                <a 
                  href="#" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 opacity-75 hover:opacity-100"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 opacity-75 hover:opacity-100"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 opacity-75 hover:opacity-100"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Floating Park Name */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="font-body text-sm text-gray-800 font-medium">
            {currentVideo.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;