import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBarResults from '../components/NavBarResults';
import parkData from '../data/parklookup.json';
import resultsBg from '../images/resultspagebackgrounddark.png';

type ParkEntry = {
  zip: string;
  state_name: string;
  closest_park: string;
  park_type: string;
  expected_file_name: string;
};

const SLIDE_WIDTH = 240; // px
const SLIDE_GAP = 24; // px

function ResultsPage() {
  const { zip } = useParams<{ zip: string }>();
  const matches = (parkData as ParkEntry[]).filter((entry) => entry.zip === zip);

  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 40) {
      setCurrentSlide((prev) => Math.min(prev + 1, matches.length - 1));
    } else if (touchEndX.current - touchStartX.current > 40) {
      setCurrentSlide((prev) => Math.max(prev - 1, 0));
    }
  };

  if (matches.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl font-body">No data found for ZIP code: {zip}</p>
      </div>
    );
  }

  const parkName = matches[0].closest_park;
  const stateName = matches[0].state_name;
  const shareUrl = `https://parkneighbor.dittoditto.io/results/${zip}`;

  // Share icon SVG
  const ShareIcon = (
    <svg className="inline w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 1 0-6 0v8a3 3 0 1 0 6 0V8zm0 0l4 4m0 0l-4 4" />
    </svg>
  );

  // Fancy arrow SVGs
  const ArrowButton = ({
    direction,
    onClick,
    disabled,
  }: {
    direction: 'left' | 'right';
    onClick: () => void;
    disabled?: boolean;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 text-black rounded-full p-2 shadow-lg transition-all duration-200 flex items-center justify-center
        ${direction === 'left' ? 'left-0 -translate-y-1/2 -translate-x-1/2' : 'right-0 -translate-y-1/2 translate-x-1/2'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
      `}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
      style={{ width: 48, height: 48 }}
    >
      {direction === 'left' ? (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </button>
  );

  // Share handler (for mobile native share)
  const handleShare = (url: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this National Park Neighbor!',
        url,
      });
    } else {
      alert('Sharing is only supported on mobile devices.');
    }
  };

  // Force download handler for cross-origin images
  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url, { mode: 'cors' });
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
      window.open(url, '_blank');
    }
  };

  // Slider headings
  const slideHeadings = [
    "Show your #parkneighbor pride in your Stories",
    "Make your #parkneighbor post-worthy",
    "Share your #parkneighbor everywhere"
  ];

  // Modal for sharing
  const Modal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div
        className="rounded-xl shadow-2xl p-8 max-w-md w-full relative"
        style={{
          background: '#c29248',
          border: '8px solid #000',
        }}
      >
        <button
          className="absolute top-3 right-3 text-gray-700 hover:text-black text-2xl"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-heading mb-4 text-center text-black">
          Share Your <span className="text-green-700">#Parkneighbor</span>
        </h2>
        <div className="mb-4">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="w-full px-3 py-2 rounded bg-gray-100 text-gray-800 font-mono mb-2"
            onFocus={(e) => e.target.select()}
          />
          <button
            className="bg-black text-white px-4 py-1 rounded font-body text-xs font-bold"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy Link
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <a
            href={`https://twitter.com/intent/tweet?text=Check out my National Park Neighbor! ${shareUrl} #Parkneighbor`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-4 py-2 rounded font-body font-bold text-center"
          >
            Share on Twitter/X
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-700 text-white px-4 py-2 rounded font-body font-bold text-center"
          >
            Share on Facebook
          </a>
        </div>
        <div className="flex flex-col gap-2">
          {matches.map((entry, idx) => {
            const imgUrl = `https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/${entry.expected_file_name}`;
            const downloadLabels = ['Download Story', 'Download Portrait', 'Download Square'];
            return (
              <button
                key={imgUrl}
                onClick={() => handleDownload(imgUrl, entry.expected_file_name)}
                className="bg-gray-200 text-black px-4 py-2 rounded font-body font-bold text-center"
              >
                {downloadLabels[idx] || 'Download'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white flex flex-col"
      style={{ backgroundImage: `url(${resultsBg})` }}
    >
      <Helmet>
        <meta property="og:image" content={matches[0] ? `https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/${matches[0].expected_file_name}` : '/default-share.png'} />
        <meta name="twitter:image" content={matches[0] ? `https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/${matches[0].expected_file_name}` : '/default-share.png'} />
      </Helmet>

      <NavBarResults onShareClick={() => setShowModal(true)} />

      {showModal && <Modal />}

      <div className="flex-1 flex flex-col items-center justify-start px-4 pt-24 pb-4 w-full">
        <h3 className="text-xl md:text-2xl font-textured mb-2 text-center leading-tight drop-shadow-lg text-black">
          Your National Park Neighbor is
        </h3>
        <h1 className="text-3xl md:text-5xl font-heading mb-2 text-center leading-tight drop-shadow-lg text-black">
          {parkName}
        </h1>
        <h2 className="text-lg md:text-xl font-body mb-8 text-center leading-tight drop-shadow-lg text-black">
          {stateName}
        </h2>
      </div>

      {/* Slider header and carousel */}
      <div className="w-full flex flex-col items-center justify-end mb-2 relative" style={{ flex: '0 0 auto', minHeight: 100 }}>
        {/* Animated Heading */}
        <div className="w-full mb-6 flex flex-col items-center" style={{ minHeight: 48 }}>
          <span
            className="text-2xl md:text-3xl font-body text-black text-center font-bold drop-shadow-lg tracking-tight transition-opacity duration-300"
          >
            {slideHeadings[currentSlide]}
          </span>
        </div>

        {/* Carousel (responsive for mobile and desktop) */}
        <div className="w-full flex flex-col items-center justify-end mb-8 relative">
          <div className="w-full max-w-3xl flex items-center justify-center mx-auto relative">
            {/* Left Arrow */}
            <ArrowButton
              direction="left"
              onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
              disabled={currentSlide === 0}
            />

            {/* Slides Row */}
            <div
              className="overflow-hidden w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500"
                style={{
                  width:
                    window.innerWidth < 640
                      ? `calc(${matches.length} * 100vw)`
                      : `${matches.length * (SLIDE_WIDTH + SLIDE_GAP)}px`,
                  maxWidth: `${matches.length * (SLIDE_WIDTH + SLIDE_GAP)}px`,
                  transform:
                    window.innerWidth < 640
                      ? `translateX(-${currentSlide * 100}vw)`
                      : `translateX(calc(50% - ${(SLIDE_WIDTH + SLIDE_GAP) * currentSlide + SLIDE_WIDTH / 2}px))`,
                  gap: `${SLIDE_GAP}px`,
                }}
              >
                {matches.map((entry, index) => {
                  const imgUrl = `https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/${entry.expected_file_name}`;
                  const downloadLabels = ['Download Story', 'Download Portrait', 'Download Square'];
                  const downloadLabel = downloadLabels[index] || 'Download';
                  const isActive = index === currentSlide;

                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center transition-all duration-300 flex-shrink-0 ${
                        isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-60 z-0'
                      } w-full sm:w-[240px]`}
                      style={{
                        justifyContent: 'flex-start',
                      }}
                    >
                      <div
                        className="rounded-lg shadow-lg shadow-black/70 mx-auto bg-white flex items-center justify-center"
                        style={{
                          width: '100%',
                          padding: 0,
                          background: '#eee',
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt={`${entry.closest_park} — Share Card ${index + 1}`}
                          className="block"
                          style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '80vh',
                            objectFit: 'contain',
                            display: 'block',
                          }}
                        />
                      </div>
                      {/* Only show the button area for the active slide */}
                      {isActive && (
                        <div className="flex flex-col gap-3 mt-4 w-full max-w-xs">
                          {/* URL Input and Copy Button */}
                          <div className="relative w-full max-w-xs">
                            <input
                              type="text"
                              value={imgUrl}
                              readOnly
                              className="w-full pr-24 pl-3 py-2 rounded-full bg-gray-100 text-black text-xs font-mono truncate border border-gray-300"
                              tabIndex={-1}
                              aria-label="Image URL"
                            />
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(imgUrl);
                                setCopiedIdx(index);
                                setTimeout(() => setCopiedIdx(null), 1500);
                              }}
                              className={`absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1 rounded-full font-body text-xs font-bold transition-all duration-200 flex items-center justify-center
                          ${copiedIdx === index
                            ? 'bg-green-600 text-white w-20'
                            : 'bg-black text-white w-[70px] hover:bg-gray-800'}
                        `}
                              style={{ minWidth: '70px' }}
                            >
                              {copiedIdx === index ? (
                                // Checkmark SVG
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                'Copy'
                              )}
                            </button>
                          </div>
                          {/* Download */}
                          <button
                            onClick={() => handleDownload(imgUrl, entry.expected_file_name)}
                            className="bg-white text-black px-5 py-2 rounded-full font-body text-sm font-bold hover:bg-gray-200 transition text-center"
                          >
                            {downloadLabel}
                          </button>
                          {/* Share (mobile only) */}
                          <button
                            onClick={() => handleShare(imgUrl)}
                            className="bg-white text-black px-5 py-2 rounded-full font-body text-sm font-bold hover:bg-gray-200 transition flex items-center justify-center md:hidden"
                            style={{ display: 'flex' }}
                          >
                            {ShareIcon}
                            Share
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Arrow */}
            <ArrowButton
              direction="right"
              onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, matches.length - 1))}
              disabled={currentSlide === matches.length - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;