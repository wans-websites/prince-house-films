// src/lib/fallbacks.js
// Fallback constants for every Sanity-migrated section.
// Values are copied EXACTLY from the current component files (AUDIT.md §2).
// When Sanity returns null/undefined/error, components render these so the
// UI is pixel-identical to the pre-migration site.
import partner1 from "../assets/img/partners/cocacola.jpeg";
import partner2 from "../assets/img/partners/darling.png";
import partner3 from "../assets/img/partners/delish.png";
import partner4 from "../assets/img/partners/drmatress.png";
import partner5 from "../assets/img/partners/eabl.jpeg";
import partner6 from "../assets/img/partners/furnitureplace.png";
import partner7 from "../assets/img/partners/lcwaikiki.png";
import partner8 from "../assets/img/partners/megagrowth.png";
import partner9 from "../assets/img/partners/orient.png";
import partner10 from "../assets/img/partners/prestige.png";
import partner11 from "../assets/img/partners/sarit.png";
import partner12 from "../assets/img/partners/titi.png";
import partner13 from "../assets/img/partners/tworivers.png";
import partner14 from "../assets/img/partners/vspa.png";
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





export const fallbackServicesSection = {
  sectionTitle: "Our Creative Services",
};





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
  { order: 1, name: "Coca Cola", img: partner1, logoAlt: "Coca Cola logo", url: null },
  { order: 2, name: "Darling", img: partner2, logoAlt: "Darling logo", url: null },
  { order: 3, name: "Delish", img: partner3, logoAlt: "Delish logo", url: null },
  { order: 4, name: "Dr. Mattress", img: partner4, logoAlt: "Dr. Mattress logo", url: null },
  { order: 5, name: "EABL", img: partner5, logoAlt: "EABL logo", url: null },
  { order: 6, name: "Furniture Place", img: partner6, logoAlt: "Furniture Place logo", url: null },
  { order: 7, name: "LC Waikiki", img: partner7, logoAlt: "LC Waikiki logo", url: null },
  { order: 8, name: "Mega Growth", img: partner8, logoAlt: "Mega Growth logo", url: null },
  { order: 9, name: "Orient", img: partner9, logoAlt: "Orient logo", url: null },
  { order: 10, name: "Prestige", img: partner10, logoAlt: "Prestige logo", url: null },
  { order: 11, name: "Sarit", img: partner11, logoAlt: "Sarit logo", url: null },
  { order: 12, name: "Titi", img: partner12, logoAlt: "Titi logo", url: null },
  { order: 13, name: "Two Rivers", img: partner13, logoAlt: "Two Rivers logo", url: null },
  { order: 14, name: "V Spa", img: partner14, logoAlt: "V Spa logo", url: null },
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
