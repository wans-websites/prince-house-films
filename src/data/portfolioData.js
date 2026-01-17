// Sample portfolio data - replace with your actual content
export const portfolioData = {
  cinematic: {
    title: "Cinematic / Videography Portfolio",
    items: [
      {
        type: "video",
        src: "https://assets.codepen.io/148180/video1.mp4",
        url: "https://instagram.com/cinemashort1",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
        url: "https://instagram.com/photo1",
      },
      // Add 20+ items for each category
    ],
  },
  creativeContent: {
    title: "Creative Content Portfolio",
    items: [
      {
        type: "video",
        src: "https://assets.codepen.io/148180/video2.mp4",
        url: "https://tiktok.com/creative1",
      },
      // Add more items
    ],
  },
  motionGraphics: {
    title: "Motion Graphics Portfolio",
    items: [
      // Add items
    ],
  },
  graphicDesign: {
    title: "Graphic Design Portfolio",
    items: [
      // Add items
    ],
  },
  eventCoverage: {
    title: "Event Coverage Portfolio",
    items: [
      // Add items
    ],
  },
};

// Helper function to get portfolio by service key
export const getPortfolioByService = (serviceKey) => {
  return (
    portfolioData[serviceKey] || {
      title: "Portfolio",
      items: [],
    }
  );
};
