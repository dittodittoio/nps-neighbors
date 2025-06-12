import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { isValidZip } from '../utils/lookupPark';
import NavBar from '../components/NavBar'; // <-- Import NavBar

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

function HomePage() {
  const [currentVideo, setCurrentVideo] = useState(videoList[0]);
  const [zipCode, setZipCode] = useState('');
  const [videoError, setVideoError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoList.length);
    setCurrentVideo(videoList[randomIndex]);
    // Removed isScrolled logic as it was unused
  }, []);

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
  };

  const handleZipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(zipCode)) {
      alert('Please enter a valid 5-digit U.S. ZIP code.');
      return;
    }
    if (!isValidZip(zipCode)) {
      alert("Sorry friend, that's not a U.S. Zip Code");
      return;
    }
    navigate(`/results/${zipCode}`);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  // Azure video URL helper
  const getVideoUrl = (filename: string) =>
    `https://assets.dittoditto.io/campaigns/NationalParks/Videos/${filename}`;

  // Azure still image URL helper
  const getStillImagePath = (filename: string) =>
    `https://assets.dittoditto.io/campaigns/NationalParks/Videos/${filename.replace('.mp4', '.png')}`;

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
          <source src={getVideoUrl(currentVideo.file)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div
          className="video-background bg-cover bg-center bg-no-repeat w-full h-full absolute inset-0"
          style={{ backgroundImage: `url(${getStillImagePath(currentVideo.file)})` }}
        />
      )}

      <div className="fixed inset-0 bg-black bg-opacity-40 z-0"></div>

      <NavBar /> {/* <-- Use NavBar component here */}

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
                  onChange={handleZipChange}
                  placeholder="Enter your U.S. ZIP code"
                  className="w-full pl-6 pr-36 py-4 rounded-full text-center font-body text-lg bg-white bg-opacity-90 backdrop-blur-sm border-0 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition-all duration-200 shadow-lg placeholder-gray-500"
                  maxLength={5}
                  pattern="\d{5}"
                  inputMode="numeric"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full font-textured text-sm font-bold hover:bg-gray-800 transition-all duration-200 shadow-md min-w-[90px]"
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
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <a
                href="https://dittoditto.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-body text-sm opacity-75 hover:opacity-100 underline md:no-underline"
              >
                Crafted by Ditto
              </a>
              <div className="flex items-center space-x-6">
                <a
                  href="https://instagram.com/dittoditto.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors duration-200 opacity-75 hover:opacity-100"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com/@dittoditto.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300 transition-colors duration-200 opacity-75 hover:opacity-100"
                  aria-label="TikTok"
                >
                  {/* TikTok SVG Icon */}
                  <svg className="w-5 h-5" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                    <path d="M28.5 10.7c-2.2 0-4-1.8-4-4V3.5h-4.1v17.2c0 2.3-1.9 4.2-4.2 4.2s-4.2-1.9-4.2-4.2 1.9-4.2 4.2-4.2c.3 0 .6 0 .9.1v-4.2c-.3 0-.6-.1-.9-.1-4.6 0-8.3 3.7-8.3 8.3s3.7 8.3 8.3 8.3 8.3-3.7 8.3-8.3V14c1.1.7 2.4 1.1 3.8 1.1h.4v-4.4h-.2z"/>
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

export default HomePage;