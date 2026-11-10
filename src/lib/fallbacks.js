// src/lib/fallbacks.js
// Fallback constants for every Sanity-migrated section.
// Values are copied EXACTLY from the current component files (AUDIT.md §2).
// When Sanity returns null/undefined/error, components render these so the
// UI is pixel-identical to the pre-migration site.
// Do NOT "improve" or restructure these values.

export const fallbackSiteSettings = {
  brandName: "Prince House Films",
  logo: null,
  logoAlt: "Prince House Films",
  siteUrl: "https://www.princehousefilms.com",
  email: "info@princehousefilms.com",
  phone: "+254 715 130 028",
  address: "Nairobi, Kenya",
  instagramUrl:
    "https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs",
  instagramCtaLabel: "View Full Portfolio on Instagram",
};

export const fallbackHeader = {
  logo: null,
  logoAlt: "Prince House Films",
  navLinks: [
    { id: "home", label: "Home", path: "/" },
    { id: "about", label: "Who We Are", path: "/about" },
    { id: "services", label: "What We Do", path: "/services" },
    { id: "partnerships", label: "partnerships", path: "/partnerships" },
    { id: "team", label: "The Team", path: "/team" },
    { id: "contact", label: "Contact", path: "/contact" },
  ],
  menuOpenAria: "Open menu",
  menuCloseAria: "Close menu",
};

export const fallbackPreloader = {
  logo: null,
  logoAlt: "Princehouse Films Logo",
  loadingText: "Loading",
  loadingDetails: [
    { label: "Initializing Visuals" },
    { label: "Loading Assets" },
    { label: "Preparing Experience" },
  ],
  backgroundVideoUrl: "/assets/img/WildNowLogovideo.mp4",
};

export const fallbackAbout = {
  title: "Who We Are",
  body:
    "Prince House Films is a full-service creative production company specializing in visual storytelling. We help brands, businesses and organizations bring their ideas to life through high-quality video production, creative content, and digital media solutions. With a passion for excellence and innovation, we transform concepts into powerful visuals that inspire, engage, and connect with audiences",
  ctaLink: "#contact",
  ctaText: "Work With Us",
};

export const fallbackApproach = {
  sectionTitle: "Our Creative Process",
  steps: [
    {
      order: 1,
      number: "01",
      title: "Discovery & Strategy",
      description:
        "We begin by deeply understanding your vision, audience, and objectives. Through collaborative workshops and research, we develop a comprehensive creative strategy that aligns with your goals and resonates with your target audience.",
      features: [
        "Creative Brief",
        "Audience Analysis",
        "Goal Setting",
        "Strategy Development",
      ],
    },
    {
      order: 2,
      number: "02",
      title: "Concept & Planning",
      description:
        "Our creative team transforms strategy into compelling concepts. We develop scripts, storyboards, shot lists, and production plans that bring your story to life with cinematic vision and technical precision.",
      features: [
        "Script Writing",
        "Storyboarding",
        "Pre-Visualization",
        "Production Planning",
      ],
    },
    {
      order: 3,
      number: "03",
      title: "Production & Filming",
      description:
        "Using professional cinema cameras, advanced lighting, and expert crew, we capture stunning visuals that tell your story with emotional impact. We maintain open communication throughout to ensure creative alignment.",
      features: [
        "Cinematic Capture",
        "Professional Lighting",
        "Audio Recording",
        "Direction",
      ],
    },
    {
      order: 4,
      number: "04",
      title: "Post-Production",
      description:
        "Our editors, colorists, and sound designers work their magic to craft the final product. From editing to color grading, sound design to visual effects, we polish every detail to perfection.",
      features: ["Editing", "Color Grading", "Sound Design", "Visual Effects"],
    },
    {
      order: 5,
      number: "05",
      title: "Delivery & Impact",
      description:
        "We deliver final assets in all required formats and provide distribution guidance. Our partnership continues with performance analysis and support to maximize your content's impact.",
      features: [
        "Final Delivery",
        "Format Optimization",
        "Distribution Strategy",
        "Performance Analysis",
      ],
    },
  ],
  showcase: [
    {
      order: 1,
      title: "Innovative Thinking",
      description:
        "Fresh perspectives and creative solutions for every project challenge",
      iconKey: "lightbulb",
    },
    {
      order: 2,
      title: "Client Partnership",
      description:
        "Collaborative approach with transparent communication at every stage",
      iconKey: "handshake",
    },
    {
      order: 3,
      title: "Quality Assurance",
      description: "Rigorous quality checks ensuring broadcast-ready final products",
      iconKey: "play-circle",
    },
  ],
  processNote:
    "Every great film begins with a great story. Our process ensures your story is told with the creativity, precision, and passion it deserves.",
  processNoteAttribution: "— Prince House Films Team",
};

export const fallbackObjectives = {
  sectionTitle: "Our Vision & Mission",
  intro:
    "At Prince House Films, we're driven by more than just producing content. We're committed to creating meaningful visual stories that inspire action and leave lasting impact.",
  vision: {
    title: "Our Vision",
    body:
      "To become Africa's foremost creative production powerhouse, revolutionizing visual storytelling through innovation, cultural authenticity, and cinematic excellence. We envision a future where African narratives dominate global screens, inspiring generations and shaping perceptions worldwide.",
  },
  mission: {
    title: "Our Mission",
    body:
      "To empower brands, organizations, and individuals with compelling visual stories that drive growth, foster emotional connections, and inspire meaningful action. Through technical mastery, creative innovation, and collaborative partnerships, we transform concepts into captivating cinematic experiences.",
  },
  valuesHeading: "Our Core Values",
  values: [
    {
      order: 1,
      title: "Innovation",
      description:
        "Pushing creative boundaries with fresh ideas and cutting-edge techniques",
      iconKey: "bulb",
    },
    {
      order: 2,
      title: "Passion",
      description: "Driven by genuine love for storytelling and visual excellence",
      iconKey: "heart",
    },
    {
      order: 3,
      title: "Excellence",
      description: "Uncompromising quality in every frame and every project",
      iconKey: "trending-up",
    },
    {
      order: 4,
      title: "Collaboration",
      description: "Partnering closely with clients to achieve shared vision",
      iconKey: "group",
    },
  ],
};

export const fallbackCounts = {
  sectionTitle: "Our Impact in Numbers",
  stats: [
    {
      order: 1,
      number: 10,
      suffix: "+",
      label: "Years of Excellence",
      description: "A decade of cinematic storytelling mastery",
      iconKey: "camera-movie",
    },
    {
      order: 2,
      number: 200,
      suffix: "+",
      label: "Projects Completed",
      description: "Successful film and video productions",
      iconKey: "trophy",
    },
    {
      order: 3,
      number: 150,
      suffix: "+",
      label: "Happy Clients",
      description: "Brands and organizations served globally",
      iconKey: "globe",
    },
    {
      order: 4,
      number: 98,
      suffix: "%",
      label: "Client Satisfaction",
      description: "Consistent 5-star reviews and referrals",
      iconKey: "happy",
    },
  ],
  achievements: [
    {
      order: 1,
      title: "Premium Quality",
      description: "Broadcast standard",
      iconKey: "star",
    },
    {
      order: 2,
      title: "Global Reach",
      description: "International projects",
      iconKey: "world",
    },
  ],
};

export const fallbackWhyUs = {
  sectionTitle: "Why Choose Prince House Films",
  intro:
    "In a crowded market of content creators, we stand apart through our unique blend of cinematic artistry, technical excellence, and client-focused partnership. Here's what makes us different.",
  reasons: [
    {
      order: 1,
      title: "Creative Excellence",
      description:
        "We don't just produce content—we craft cinematic experiences. Our team of award-winning creatives brings fresh perspectives, innovative ideas, and artistic vision to every project.",
      features: [
        "Award-winning creative team",
        "Innovative storytelling approaches",
        "Artistic cinematic vision",
        "Fresh perspectives on every project",
      ],
      iconKey: "star",
    },
    {
      order: 2,
      title: "Professional Quality",
      description:
        "Broadcast-level production standards with state-of-the-art equipment. From 8K cinema cameras to professional lighting and sound, we deliver premium quality that stands out.",
      features: [
        "State-of-the-art equipment",
        "Broadcast-level production standards",
        "Professional-grade post-production",
        "Quality assurance at every stage",
      ],
      iconKey: "check-shield",
    },
    {
      order: 3,
      title: "Timely Delivery",
      description:
        "Efficient workflows and deadline-driven processes ensure your project is delivered on time, every time. We respect your timeline while maintaining our quality standards.",
      features: [
        "Efficient production workflows",
        "Deadline-driven project management",
        "Clear milestone tracking",
        "On-time delivery guarantee",
      ],
      iconKey: "time",
    },
    {
      order: 4,
      title: "Client-Centered Approach",
      description:
        "Your vision is our priority. We maintain transparent communication, welcome your feedback, and ensure you're involved in every creative decision throughout the process.",
      features: [
        "Transparent communication",
        "Collaborative decision-making",
        "Regular progress updates",
        "Flexible to client feedback",
      ],
      iconKey: "user-voice",
    },
  ],
  comparisonHeading: "The Prince House Films Difference",
  comparisonUsLabel: "With Us",
  comparisonOthersLabel: "With Others",
  comparisonUsItems: [
    { text: "Strategic creative planning for maximum impact" },
    { text: "Cinematic production quality on every project" },
    { text: "Dedicated project manager and creative team" },
    { text: "Comprehensive post-production with color grading" },
    { text: "Ongoing support and performance analysis" },
  ],
  comparisonOthersItems: [
    { text: "Basic video production without strategy" },
    { text: "Standard quality with limited creative input" },
    { text: "Minimal communication and support" },
    { text: "Basic editing without cinematic polish" },
    { text: "Project ends at delivery with no follow-up" },
  ],
  footerStats: [
    { order: 1, number: "200+", label: "Projects Completed" },
    { order: 2, number: "98%", label: "Client Satisfaction" },
    { order: 3, number: "50+", label: "Industry Awards" },
    { order: 4, number: "24/7", label: "Support Available" },
  ],
};

export const fallbackServicesSection = {
  sectionTitle: "Our Creative Services",
};

export const fallbackPortfolioSection = {
  sectionTitle: "Our Portolio",
  categories: [
    { order: 1, label: "All Projects" },
    { order: 2, label: "Commercial" },
    { order: 3, label: "Documentary" },
    { order: 4, label: "Corporate" },
    { order: 5, label: "Social Media" },
    { order: 6, label: "Events" },
  ],
};

export const fallbackPortfolioItems = [
  {
    id: 1,
    order: 1,
    title: "Wildlife Conservation Documentary",
    category: "documentary",
    description: "Award-winning documentary on African wildlife conservation",
    details:
      "This groundbreaking documentary took us across 5 African countries over 18 months. We captured never-before-seen footage of endangered species and worked closely with conservation experts to tell a compelling story about biodiversity preservation.",
    
    image:
      "https://images.unsplash.com/photo-1550358864-518f202c02ba?q=80&w=1200",
    coverAlt: "Wildlife Conservation Documentary",
    client: "National Geographic",
    year: "2023",
    duration: "45 min",
    awards: ["Best Documentary 2023", "Wildlife Film Festival Winner"],
    watchCtaLabel: "Watch Film",
  },
  {
    id: 2,
    order: 2,
    title: "Tech Startup Brand Film",
    category: "commercial",
    description: "Corporate brand film for Silicon Valley tech startup",
    details:
      "A sleek, futuristic brand film that established TechNova's identity in the competitive AI market. We utilized advanced CGI and motion graphics to visualize complex tech concepts.",
    
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w-1200",
    coverAlt: "Tech Startup Brand Film",
    client: "TechNova Inc.",
    year: "2024",
    duration: "3 min",
    awards: ["Best Brand Film", "Marketing Excellence Award"],
    watchCtaLabel: "Watch Film",
  },
  {
    id: 3,
    order: 3,
    title: "Music Festival Coverage",
    category: "events",
    description: "Multi-camera live coverage of major music festival",
    details:
      "Complete live production coverage of Africa's largest music festival. We deployed 12 camera crews, drone teams, and mobile production units to capture every moment.",
    
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w-1200",
    coverAlt: "Music Festival Coverage",
    client: "MTV Africa",
    year: "2023",
    duration: "120 min",
    awards: ["Best Event Coverage", "Live Production Award"],
    watchCtaLabel: "Watch Film",
  },
  {
    id: 4,
    order: 4,
    title: "Corporate Training Series",
    category: "corporate",
    description:
      "12-part training video series for multinational corporation",
    details:
      "Comprehensive training program filmed across 8 countries. Each episode was customized for local markets while maintaining consistent branding and messaging.",
    
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
    coverAlt: "Corporate Training Series",
    client: "GlobalCorp",
    year: "2024",
    duration: "6 hours total",
    awards: ["Excellence in Corporate Media"],
    watchCtaLabel: "Watch Film",
  },
  {
    id: 5,
    order: 5,
    title: "Social Media Campaign",
    category: "social",
    description: "Viral social media campaign for fashion brand",
    details:
      "A 30-day social media campaign that generated over 50 million views. We produced 30 unique 30-second episodes, each with tailored content for different platforms.",
    
    image:
      "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg",
    coverAlt: "Social Media Campaign",
    client: "UrbanStyle",
    year: "2024",
    duration: "30 sec episodes",
    awards: ["Viral Campaign Award", "Social Media Excellence"],
    watchCtaLabel: "Watch Film",
  },
  {
    id: 6,
    order: 6,
    title: "Product Launch Film",
    category: "commercial",
    description: "Cinematic product launch for luxury automotive brand",
    details:
      "A cinematic masterpiece shot over 3 continents. We captured the new luxury vehicle in stunning locations from Swiss Alps to Dubai deserts.",
    
    image:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200",
    coverAlt: "Product Launch Film",
    client: "Luxury Motors",
    year: "2023",
    duration: "5 min",
    awards: ["Best Automotive Film", "Cinematography Award"],
    watchCtaLabel: "Watch Film",
  },
];

export const fallbackGallerySection = {
  sectionTitle: "Behind the Scenes Gallery",
  intro:
    "Take a look at the passion, precision, and creativity that goes into every Prince House Films production. From breathtaking locations to intricate setups.",
  categories: [
    { order: 1, label: "All" },
    { order: 2, label: "Behind the Scenes" },
    { order: 3, label: "Production" },
    { order: 4, label: "Events" },
    { order: 5, label: "Locations" },
    { order: 6, label: "Equipment" },
  ],
  viewMoreLink: "/full-gallery",
  viewMoreLabel: "View More in Gallery",
};

export const fallbackGalleryItems = [
  {
    id: 1,
    order: 1,
    title: "Wildlife Documentary Shoot",
    category: "behind-scenes",
    description: "Capturing rare wildlife moments in Maasai Mara",
    
    image:
      "https://images.unsplash.com/photo-1550358864-518f202c02ba?q=80&w=1200",
    coverAlt: "Wildlife Documentary Shoot",
    date: "2023",
    location: "Maasai Mara, Kenya",
    type: "photo",
  },
  {
    id: 2,
    order: 2,
    title: "Studio Production Setup",
    category: "production",
    description: "Professional studio setup for commercial shoot",
    
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
    coverAlt: "Studio Production Setup",
    date: "2024",
    location: "Nairobi Studio",
    type: "photo",
  },
  {
    id: 3,
    order: 3,
    title: "Music Festival Coverage",
    category: "events",
    description: "Multi-camera setup for live festival broadcast",
    
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200",
    coverAlt: "Music Festival Coverage",
    date: "2023",
    location: "Carnivore Grounds, Nairobi",
    type: "video",
  },
  {
    id: 4,
    order: 4,
    title: "Mountain Documentary Location",
    category: "locations",
    description: "Shooting in challenging mountain terrain",
    
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
    coverAlt: "Mountain Documentary Location",
    date: "2023",
    location: "Mount Kenya",
    type: "photo",
  },
  {
    id: 5,
    order: 5,
    title: "Cinema Camera Setup",
    category: "equipment",
    description: "Professional cinema camera rig for film shoot",
    
    image:
      "https://images.unsplash.com/photo-1563297007-0686b7003af7?q=80&w=1200",
    coverAlt: "Cinema Camera Setup",
    date: "2024",
    location: "Production Set",
    type: "photo",
  },
  {
    id: 6,
    order: 6,
    title: "Corporate Event Coverage",
    category: "events",
    description: "Live streaming setup for corporate conference",
    
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200",
    coverAlt: "Corporate Event Coverage",
    date: "2024",
    location: "KICC, Nairobi",
    type: "video",
  },
  {
    id: 7,
    order: 7,
    title: "Post-Production Suite",
    category: "production",
    description: "Color grading and editing workstation",
    
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200",
    coverAlt: "Post-Production Suite",
    date: "2024",
    location: "Post-Production Studio",
    type: "photo",
  },
  {
    id: 8,
    order: 8,
    title: "Drone Cinematography",
    category: "equipment",
    description: "Aerial shots for commercial production",
    
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200",
    coverAlt: "Drone Cinematography",
    date: "2023",
    location: "Coastal Region",
    type: "video",
  },
  {
    id: 9,
    order: 9,
    title: "Interview Setup",
    category: "behind-scenes",
    description: "Professional interview lighting and audio setup",
    
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200",
    coverAlt: "Interview Setup",
    date: "2024",
    location: "Documentary Set",
    type: "photo",
  },
];

export const fallbackTeam = {
  sectionTitle: "Meet Our Creative Team",
  intro:
    "A passionate collective of storytellers, cinematographers, and innovators",
  groupPhoto: null,
  groupPhotoTitle: "The Creative Minds",
  groupPhotoDescription: "United by passion, driven by innovation",
};

export const fallbackPartnershipSection = {
  badgeLabel: "Strategic Alliances",
  sectionTitle: "Our Valued Partnerships",
  intro:
    "Building lasting relationships that drive creative excellence and mutual success",
  actionButtonLabel: "Explore Partnership",
};

export const fallbackPartners = [
  { order: 1, name: "Coca Cola", logo: null, logoAlt: "Coca Cola logo", url: null },
  { order: 2, name: "Darling", logo: null, logoAlt: "Darling logo", url: null },
  { order: 3, name: "Delish", logo: null, logoAlt: "Delish logo", url: null },
  { order: 4, name: "Dr. Mattress", logo: null, logoAlt: "Dr. Mattress logo", url: null },
  { order: 5, name: "EABL", logo: null, logoAlt: "EABL logo", url: null },
  { order: 6, name: "Furniture Place", logo: null, logoAlt: "Furniture Place logo", url: null },
  { order: 7, name: "LC Waikiki", logo: null, logoAlt: "LC Waikiki logo", url: null },
  { order: 8, name: "Mega Growth", logo: null, logoAlt: "Mega Growth logo", url: null },
  { order: 9, name: "Orient", logo: null, logoAlt: "Orient logo", url: null },
  { order: 10, name: "Prestige", logo: null, logoAlt: "Prestige logo", url: null },
  { order: 11, name: "Sarit", logo: null, logoAlt: "Sarit logo", url: null },
  { order: 12, name: "Titi", logo: null, logoAlt: "Titi logo", url: null },
  { order: 13, name: "Two Rivers", logo: null, logoAlt: "Two Rivers logo", url: null },
  { order: 14, name: "V Spa", logo: null, logoAlt: "V Spa logo", url: null },
];

export const fallbackPartnershipTypes = [
  {
    order: 1,
    title: "Brand Partnerships",
    description:
      "Long-term collaborations with brands for consistent content production",
    features: [
      "Monthly content production",
      "Brand integration",
      "Performance analytics",
      "Strategic planning",
    ],
    iconKey: "building",
    color: "#FF2A26",
    accent: "#FF6B66",
  },
];

export const fallbackGetInTouch = {
  sectionTitle: "Have a Project In Mind?",
  intro:
    "Ready to bring your vision to life? Connect with us through any channel.",
  contactDetails: [
    {
      order: 1,
      title: "Location",
      content: "Nairobi, Kenya",
      link: "https://maps.google.com/?q=Nairobi+Kenya",
      linkText: "Directions",
      external: true,
      iconKey: "map",
    },
    {
      order: 2,
      title: "Email",
      content: "info@princehousefilms.com",
      link: "mailto:info@princehousefilms.com",
      linkText: "Email Us",
      external: false,
      iconKey: "envelope",
    },
    {
      order: 3,
      title: "Phone",
      content: "+254 715 130 028",
      link: "tel:+254 715 130 028",
      linkText: "Call Now",
      external: false,
      iconKey: "phone",
    },
  ],
  socialsHeading: "Follow Us",
  socials: [
    {
      order: 1,
      platform: "instagram",
      handle: "@princehouse_films",
      url: "https://instagram.com/princehouse_films",
      iconClass: "BiLogoInstagram",
      color: "#E1306C",
    },
    {
      order: 2,
      platform: "facebook",
      handle: "Prince House Films",
      url: "https://facebook.com/PrinceHouseFilms",
      iconClass: "BiLogoFacebook",
      color: "#1877F2",
    },
    {
      order: 3,
      platform: "tiktok",
      handle: "@princehousefilms",
      url: "https://tiktok.com/@princehousefilms",
      iconClass: "FaTiktok",
      color: "#000000",
    },
    {
      order: 4,
      platform: "linkedin",
      handle: "Prince House Films",
      url: "https://linkedin.com/company/prince-house-films",
      iconClass: "BiLogoLinkedin",
      color: "#0A66C2",
    },
  ],
  ctaTitle: "Free 30-Min Consultation",
  ctaDescription: "Discuss your project with our creative director",
  consultationUrl: "https://calendly.com/princehousefilms/consultation",
  bookNowLabel: "Book Now",
  callUrl: "tel:+254715130028",
  callLabel: "Call",
  ctaNote: "24-hour response",
};

export const fallbackFooter = {
  logo: null,
  logoAlt: "Prince House Films",
  socials: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/princehouse_films?igsh=eHFqazhiZDlhbmZs",
      iconClass: "bi bi-instagram",
      color: "#E1306C",
    },
    {
      platform: "youtube",
      url: "https://www.youtube.com/channel/UCOwyOyK5LqLbR9byJWxzT1w",
      iconClass: "bi bi-youtube",
      color: "#FF0000",
    },
    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@princehousefilms?_r=1&_t=ZS-93Two21vb3y",
      iconClass: "bi bi-tiktok",
      color: "#000000",
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/Princehousefilms?mibextid=wwXIfr&rdid=aouG8uGzL9Uk0Kvw&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17PyRWjWCT%2F%3Fmibextid%3DwwXIfr%26ref%3D1#",
      iconClass: "bi bi-facebook",
      color: "#1877F2",
    },
  ],
  privacyLink: "/privacy-policy",
  privacyLabel: "Privacy Policy",
  copyrightText: "Prince House Films",
};

export const fallbackPrivacyPolicy = {
  backToHomeLabel: "Back to Home",
  eyebrow: "Legal",
  title: "Privacy Policy for Prince House Films",
  effectiveDate: "15/04/2026",
  lastUpdated: "15/04/2026",
  body: [
    {
      _key: "pp-1",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-1-c1",
          _type: "span",
          text: "At Prince House Films, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, engage with us on social media platforms such as Facebook, Instagram, LinkedIn, or contact us directly.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-2",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-2-c1",
          _type: "span",
          text: "By using our website, pages, or services, you agree to the terms of this Privacy Policy.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-3",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-3-c1",
          _type: "span",
          text: "1. Information We Collect",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-4",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-4-c1",
          _type: "span",
          text: "We may collect the following information:",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-5",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-5-c1",
          _type: "span",
          text: "Name",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-6",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-6-c1",
          _type: "span",
          text: "Email address",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-7",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-7-c1",
          _type: "span",
          text: "Phone number",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-8",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-8-c1",
          _type: "span",
          text: "Business name",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-9",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-9-c1",
          _type: "span",
          text: "Project details or inquiries",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-10",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-10-c1",
          _type: "span",
          text: "Billing information (where applicable)",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-11",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-11-c1",
          _type: "span",
          text: "Website usage data (cookies, analytics, device information)",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-12",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-12-c1",
          _type: "span",
          text: "Social media interactions (messages, comments, form submissions)",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-13",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-13-c1",
          _type: "span",
          text: "2. How We Use Your Information",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-14",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-14-c1",
          _type: "span",
          text: "We use your information to:",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-15",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-15-c1",
          _type: "span",
          text: "Respond to inquiries and requests",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-16",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-16-c1",
          _type: "span",
          text: "Provide quotations and services",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-17",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-17-c1",
          _type: "span",
          text: "Manage projects and client communication",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-18",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-18-c1",
          _type: "span",
          text: "Improve our website and services",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-19",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-19-c1",
          _type: "span",
          text: "Send updates, offers, or promotional content (only where permitted)",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-20",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-20-c1",
          _type: "span",
          text: "Run advertising and remarketing campaigns",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-21",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-21-c1",
          _type: "span",
          text: "Comply with legal obligations",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-22",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-22-c1",
          _type: "span",
          text: "3. Cookies & Tracking Technologies",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-23",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-23-c1",
          _type: "span",
          text: "Our website and social media platforms may use cookies, pixels, and similar technologies (such as Facebook Pixel or analytics tools) to improve user experience, understand traffic, and deliver relevant advertising.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-24",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-24-c1",
          _type: "span",
          text: "You can disable cookies through your browser settings.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-25",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-25-c1",
          _type: "span",
          text: "4. Sharing of Information",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-26",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-26-c1",
          _type: "span",
          text: "We do not sell your personal information. We may share information with trusted third-party providers only when necessary, such as:",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-27",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-27-c1",
          _type: "span",
          text: "Payment processors",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-28",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-28-c1",
          _type: "span",
          text: "Website hosting providers",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-29",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-29-c1",
          _type: "span",
          text: "Analytics services",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-30",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-30-c1",
          _type: "span",
          text: "Advertising platforms",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-31",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-31-c1",
          _type: "span",
          text: "Legal or regulatory authorities where required by law",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-32",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-32-c1",
          _type: "span",
          text: "5. Data Security",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-33",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-33-c1",
          _type: "span",
          text: "We take reasonable measures to protect your personal information from unauthorized access, misuse, or loss. However, no online platform is 100% secure.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-34",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-34-c1",
          _type: "span",
          text: "6. Third-Party Platforms",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-35",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-35-c1",
          _type: "span",
          text: "Our services may link to or operate through third-party platforms such as Facebook, Instagram, LinkedIn, YouTube, or WhatsApp. Your use of those platforms is also subject to their own privacy policies.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-36",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-36-c1",
          _type: "span",
          text: "7. Your Rights",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-37",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-37-c1",
          _type: "span",
          text: "Depending on your location, you may have rights to:",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-38",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-38-c1",
          _type: "span",
          text: "Access your personal data",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-39",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-39-c1",
          _type: "span",
          text: "Correct inaccurate data",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-40",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-40-c1",
          _type: "span",
          text: "Request deletion of your data",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-41",
      _type: "block",
      style: "normal",
      listItem: "bullet",
      children: [
        {
          _key: "pp-41-c1",
          _type: "span",
          text: "Withdraw consent for marketing communications",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-42",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-42-c1",
          _type: "span",
          text: "To make such requests, contact us using the details below.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-43",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-43-c1",
          _type: "span",
          text: "8. Retention of Data",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-44",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-44-c1",
          _type: "span",
          text: "We keep your information only as long as necessary to provide services, meet legal obligations, and resolve disputes.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-45",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-45-c1",
          _type: "span",
          text: "9. Children's Privacy",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-46",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-46-c1",
          _type: "span",
          text: "Our services are not directed to children under 13, and we do not knowingly collect personal information from children without appropriate consent.",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-47",
      _type: "block",
      style: "h2",
      children: [
        {
          _key: "pp-47-c1",
          _type: "span",
          text: "10. Changes to This Policy",
          marks: [],
        },
      ],
    },
    {
      _key: "pp-48",
      _type: "block",
      style: "normal",
      children: [
        {
          _key: "pp-48-c1",
          _type: "span",
          text: "We may update this Privacy Policy from time to time. Updated versions will be posted on our website and platforms with a revised effective date.",
          marks: [],
        },
      ],
    },
  ],
};

export const fallbackErrorBoundary = {
  fallbackText: "Couldn't load this media. Try another item.",
};
