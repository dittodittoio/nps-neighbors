import React, { useState } from 'react';
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

function ResultsPage() {
  const { zip } = useParams<{ zip: string }>();
  const matches = (parkData as ParkEntry[]).filter((entry) => entry.zip === zip);

  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  // For 3 images, set order so first is in the middle on desktop
  const getOrder = (idx: number) => {
    if (matches.length === 3) {
      if (idx === 0) return 'md:order-2'; // middle
      if (idx === 1) return 'md:order-1'; // left
      if (idx === 2) return 'md:order-3'; // right
    }
    return '';
  };

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
            const imgUrl = `https://assets.dittoditto.io/campaigns/NationalParks/${entry.expected_file_name}`;
            const downloadLabels = ['Download Story', 'Download Portrait', 'Download Square'];
            return (
              <a
                key={imgUrl}
                href={imgUrl}
                download
                className="bg-gray-200 text-black px-4 py-2 rounded font-body font-bold text-center"
              >
                {downloadLabels[idx] || 'Download'}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed text-white"
      style={{ backgroundImage: `url(${resultsBg})` }}
    >
      <Helmet>
        <meta property="og:image" content={matches[0] ? `https://assets.dittoditto.io/campaigns/NationalParks/${matches[0].expected_file_name}` : '/default-share.png'} />
        <meta name="twitter:image" content={matches[0] ? `https://assets.dittoditto.io/campaigns/NationalParks/${matches[0].expected_file_name}` : '/default-share.png'} />
      </Helmet>

      <NavBarResults onShareClick={() => setShowModal(true)} />

      {showModal && <Modal />}

      <div className="flex flex-col items-center justify-center px-4 pt-24 pb-12">
        <h3 className="text-xl md:text-2xl font-textured mb-2 text-center leading-tight drop-shadow-lg text-black">
          Your National Park Neighbor is
        </h3>
        <h1 className="text-3xl md:text-5xl font-heading mb-2 text-center leading-tight drop-shadow-lg text-black">
          {parkName}
        </h1>
        <h2 className="text-lg md:text-xl font-body mb-8 text-center leading-tight drop-shadow-lg text-black">
          {stateName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 w-full max-w-6xl md:items-end">
          {matches.map((entry, index) => {
            const imgUrl = `https://assets.dittoditto.io/campaigns/NationalParks/${entry.expected_file_name}`;
            const downloadLabels = ['Download Story', 'Download Portrait', 'Download Square'];
            const downloadLabel = downloadLabels[index] || 'Download';

            return (
              <div key={index} className={`flex flex-col items-center ${getOrder(index)}`}>
                <div
                  className={`rounded-lg shadow-lg shadow-black/70 mx-auto bg-white overflow-hidden`}
                  style={{ width: 200 }}
                >
                  <img
                    src={imgUrl}
                    alt={`${entry.closest_park} — Share Card ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
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
                  <a
                    href={imgUrl}
                    download
                    className="bg-white text-black px-5 py-2 rounded-full font-body text-sm font-bold hover:bg-gray-200 transition text-center"
                  >
                    {downloadLabel}
                  </a>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;