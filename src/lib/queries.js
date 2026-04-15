// src/lib/queries.js

export const heroQuery = `
  *[_type == "hero"][0]{
    title,
    highlightedText,
    ctaText,
    ctaLink,
    backgroundType,
    backgroundVideoUrl,
    backgroundImage
  }
`;

export const servicesQuery = `
  *[_type == "service"] | order(orderRank asc){
    _id,
    title,
    text,
    icon,
    featured,
    backgroundType,
    backgroundVideoUrl,
    backgroundImage,
    mediaItems[]{
      _key,
      type,
      title,
      image,
      imageUrl,
      videoUrl,
      externalUrl
    }
  }
`;
