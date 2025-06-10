import React, { useState, useEffect } from 'react';
import { Instagram } from 'lucide-react';

const videoList = [
  { name: "Acadia", file: "Acadia.mp4", state: "Maine" },
  { name: "Arches", file: "Arches.mp4", state: "Utah" },
  { name: "Bryce Canyon", file: "Bryce-Canyon.mp4", state: "Utah" },
  { name: "Castillo de San Felipe del Morro", file: "Castillo-SanFelipe.mp4", state: "Puerto Rico" },
  { name: "Crater Lake", file: "Crater-Lake.mp4", state: "Oregon" },
  { name: "Gateway Arch", file: "Gateway-Arch.mp4", state: "Missouri" },
  { name: "Gettysburg Memorial", file: "Gettysburg-Memorial.mp4", state: "Pennsylvania" },
  { name: "Independence Hall", file: "Independence-Hall.mp4", state: "Pennsylvania" },
  { name: "Joshua Tree", file: "Joshua-Tree.mp4", state: "California" },
  { name: "Martin Luther King Jr. Memorial", file: "Martin-L.mp4", state: "District of Columbia" },
  { name: "Misión Concepción", file: "Mision-Concepcion.mp4", state: "Texas" },
  { name: "Mount Rushmore", file: "Rushmore.mp4", state: "South Dakota" },
  { name: "Statue of Liberty", file: "Statue-Liberty.mp4", state: "New York" },
  { name: "Yellowstone", file: "Yellowstone.mp4", state: "Wyoming" },
  { name: "Yosemite", file: "Yosemite.mp4", state: "California" },
  { name: "Zion", file: "Zion.mp4", state: "Utah" },
];

function App() {
  const [currentVideo, setCurrentVideo] = useState(videoList[0]);
  const [zipCode, setZipCode] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    setCurrentVideo(videoList[randomIndex]);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ZIP code submitted:', zipCode);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const getStillImagePath = (filename: string) => {
    return `/videos/stills/${filename.replace('.mp4', '.png')}`;
  };

  return (
    <div className="h-screen relative overflow-x-hidden">
      {!videoError ? (
        <video
          className="video-background w-full h-full object-cover absolute inset-0"
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
          className="video-background bg-cover bg-center bg-no-repeat w-full h-full absolute inset-0"
          style={{ backgroundImage: `url(${getStillImagePath(currentVideo.file)})` }}
        />
      )}

      <div className="fixed inset-0 bg-black bg-opacity-40 z-0"></div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black bg-opacity-80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center space-x-8">
              <a href="#campaign" className="text-white font-body text-sm hover:text-gray-300 transition-colors duration-200 tracking-wide">THE CAMPAIGN</a>
              <a href="#explore" className="text-white font-body text-sm hover:text-gray-300 transition-colors duration-200 tracking-wide">EXPLORE THE PARKS</a>
            </div>
            <div className="flex-1 md:flex-none text-center">
              <img src="/Ditto-Logo-Dark-BG.png" alt="Ditto Logo" className="h-[50px] max-h-[50px] mx-auto object-contain" />
            </div>
            <div className="hidden md:block">
              <button className="bg-white text-black font-textured px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">SHARE YOUR #PARKNEIGHBOR</button>
            </div>
            <div className="md:hidden">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 pt-24">
          <div className="text-center max-w-4xl">
            <h1 className="text-white font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">FIND YOUR NATIONAL PARK NEIGHBOR</h1>
            <p className="text-white font-body text-lg md:text-xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
              There are over 400 National Park sites across the U.S., and one is closer than you think.
            </p>
            <form onSubmit={handleZipSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter your U.S. ZIP code"
                  className="w-full pr-28 px-6 py-4 rounded-full text-center font-body text-lg bg-white bg-opacity-90 backdrop-blur-sm border-0 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 shadow-lg placeholder-gray-500"
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

        <div className="bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <p className="text-white font-body text-sm leading-relaxed opacity-90">
                  This summer, discover the National Park closest to you and show your support. These places have never mattered more. Parks and historical sites are living reflections of our history, culture, and community.
                </p>
              </div>
              <div>
                <p className="text-white font-body text-sm leading-relaxed opacity-90">
                  We're using Ditto, our data-powered storytelling platform, to lift them up and spotlight the neighborhoods they belong to.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-black bg-opacity-80 backdrop-blur-sm border-t border-white border-opacity-20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="text-white font-body text-sm opacity-75">Crafted by Ditto</div>
              <div className="flex items-center space-x-6">
                <a href="https://instagram.com/dittoditto.io" className="text-white hover:text-gray-300 transition-colors duration-200 opacity-75 hover:opacity-100" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://tiktok.com/dittoditto.io" className="text-white hover:text-gray-300 transition-colors duration-200 opacity-75 hover:opacity-100" aria-label="TikTok">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.75 3.5a6.25 6.25 0 0 0-6.25 6.25v4.5A6.25 6.25 0 0 0 9.75 20.5h.5a6.25 6.25 0 0 0 6.25-6.25v-4.5A6.25 6.25 0 0 0 10.25 3.5h-.5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          <p className="font-body text-sm text-gray-800 font-medium">
            {currentVideo.name}, {currentVideo.state}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;