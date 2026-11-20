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
    localFallbackKey,
    mediaItems[]{
      _key,
      type,
      title,
      alt,
      "imageUrl": image.asset->url,
      image,
      imageUrl,
      "videoFileUrl": videoFile.asset->url,
      videoFile,
      videoUrl,
      "videoPosterUrl": videoPoster.asset->url,
      videoPoster,
      videoPosterUrl,
      externalUrl,
      order
    }
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0]{
    brandName,
    logo,
    logoAlt,
    siteUrl,
    email,
    phone,
    address,
    instagramUrl,
    instagramCtaLabel
  }
`;

export const headerQuery = `
  *[_type == "header"][0]{
    logo,
    logoAlt,
    navLinks[]{
      _key,
      id,
      label,
      path
    },
    menuOpenAria,
    menuCloseAria
  }
`;

export const preloaderQuery = `
  *[_type == "preloader"][0]{
    logo,
    logoAlt,
    loadingText,
    loadingDetails[]{
      label
    },
    backgroundVideoUrl
  }
`;

export const aboutQuery = `
  *[_type == "about"][0]{
    title,
    body,
    ctaLink,
    ctaText
  }
`;

export const servicesSectionQuery = `
  *[_type == "servicesSection"][0]{
    sectionTitle
  }
`;

export const teamQuery = `
  *[_type == "teamSection"][0]{
    sectionTitle,
    intro,
    groupPhoto,
    groupPhotoTitle,
    groupPhotoDescription
  }
`;

export const partnershipSectionQuery = `
  *[_type == "partnershipSection"][0]{
    badgeLabel,
    sectionTitle,
    intro,
    actionButtonLabel,
    partnershipTypes[] | order(order asc){
      order,
      title,
      description,
      features[],
      iconKey,
      color,
      accent
    }
  }
`;

export const partnersQuery = `
  *[_type == "partner"] | order(order asc){
    _id,
    order,
    name,
    "img": coalesce(logo.asset->url, logoUrl),
    logoUrl,
    logoAlt,
    url
  }
`;

export const getInTouchQuery = `
  *[_type == "getInTouch"][0]{
    sectionTitle,
    intro,
    contactDetails[]-> | order(order asc){
      order,
      title,
      content,
      link,
      linkText,
      external,
      iconKey
    },
    socialsHeading,
    socials[] | order(order asc){
      order,
      platform,
      handle,
      url,
      iconClass,
      color
    },
    ctaTitle,
    ctaDescription,
    consultationUrl,
    bookNowLabel,
    callUrl,
    callLabel,
    ctaNote
  }
`;

export const footerQuery = `
  *[_type == "footer"][0]{
    logo,
    logoAlt,
    socials[]{
      platform,
      url,
      iconClass,
      color
    },
    privacyLink,
    privacyLabel,
    copyrightText
  }
`;

export const privacyPolicyQuery = `
  *[_type == "privacyPolicy"][0]{
    backToHomeLabel,
    eyebrow,
    title,
    effectiveDate,
    lastUpdated,
    body
  }
`;

export const errorBoundaryQuery = `
  *[_type == "errorBoundary"][0]{
    fallbackText
  }
`;
