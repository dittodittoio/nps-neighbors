import React from 'react';
import NavBar from '../components/NavBar';

const sections = [
  {
    title: "America’s Parks Are Under Threat",
    text: "From budget cuts to climate crisis, our public lands are being dismantled before our very eyes. These places hold our history, reflect our values, and shape our future. Let’s not lose them.",
    image: "https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/Videos/Statue-Liberty.mp4",
    parkName: "Statue of Liberty",
    state: "New York"
  },
  {
    title: "Your Park Is Closer Than You Think",
    text: "We believe proximity is power. Discover your National Park Neighbor and take pride in the natural and cultural sites just around the corner.",
    image: "https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/Videos/Yosemite.mp4",
    parkName: "Yosemite",
    state: "California"
  },
  {
    title: "Why We Built This",
    text: "Ditto uses data and design to help people connect. This campaign delivers personalized stories that highlight your park neighbor, and gives you tools to share it proudly.",
    image: "https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/Videos/Zion.mp4",
    parkName: "Zion",
    state: "Utah"
  },
  {
    title: "Take Action",
    text: "Protect what’s yours. Share what matters. Donate, volunteer, and show up for the parks near you. Explore and support these organizations:",
    image: "https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/Videos/Crater-Lake.mp4",
    parkName: "Crater Lake",
    state: "Oregon",
    ctas: [
      { label: "National Parks Foundation", url: "https://give.nationalparks.org/" },
      { label: "NPCA.org", url: "https://www.npca.org/take-action" },
      { label: "Our Parks", url: "https://ourparks.org/" },
    ]
  },
  {
    title: "Crafted by Ditto",
    text: "This project was crafted by Ditto, a creative platform that helps campaigns and communities scale their stories using data. Ditto is built by Global Creative Agency, DBC.",
    image: "https://cdn.parkneighbor.dittoditto.io/campaigns/NationalParks/Videos/Acadia.mp4",
    parkName: "Acadia",
    state: "Maine",
    ctas: [
      { label: "Visit Ditto", url: "https://dittoditto.io" },
      { label: "Visit DBC", url: "https://studiodbc.com" },
    ]
  }
];

function CampaignPage() {
  return (
    <div className="w-full">
      <NavBar />
      {sections.map((section, index) => {
        // Split the text at the first period for hierarchy
        const [firstSentence, ...rest] = section.text.split('. ');
        const restText = rest.length > 0 ? rest.join('. ') : '';

        return (
          <section
            key={index}
            className="relative min-h-screen flex items-center justify-center text-center px-6 py-24 bg-black overflow-hidden"
          >
            {/* Video background */}
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              src={section.image}
              autoPlay
              muted
              loop
              playsInline
              poster={section.image.replace('.mp4', '.png')}
            />
            <div className="absolute inset-0 bg-black bg-opacity-45 z-10"></div>
            <div className="relative z-20 prose prose-invert max-w-3xl text-white">
              {section.parkName && section.state && (
                <div className="mb-4">
                  <span className="inline-block bg-white bg-opacity-80 text-black font-body text-xs md:text-sm px-3 py-0.5 rounded-full shadow-md">
                    {section.parkName}, {section.state}
                  </span>
                </div>
              )}
              <h2 className="text-3xl md:text-5xl font-body font-bold mb-6 prose prose-invert text-balance">
                {section.title}
              </h2>
              <div className="mb-8">
                <span className="block text-lg md:text-2xl font-bold mb-2 font-body">
                  {firstSentence.trim()}
                  {rest.length > 0 ? '.' : ''}
                </span>
                {restText && (
                  <span className="block text-sm md:text-base text-gray-100 font-body">
                    {restText}
                  </span>
                )}
              </div>
              {section.ctas && (
                <div className="flex flex-col gap-3 items-center">
                  {section.ctas.map((cta, ctaIdx) => (
                    <a
                      key={ctaIdx}
                      href={cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-6 py-2 rounded-full font-body text-sm font-bold hover:bg-gray-200 transition"
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            {index === 0 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                <svg
                  className="w-8 h-8 text-white animate-bounce opacity-80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

export default CampaignPage;