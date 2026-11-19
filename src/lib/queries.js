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

export const approachQuery = `
  *[_type == "approach"][0]{
    sectionTitle,
    steps[] | order(order asc){
      order,
      number,
      title,
      description,
      features[]
    },
    showcase[] | order(order asc){
      order,
      title,
      description,
      iconKey
    },
    processNote,
    processNoteAttribution
  }
`;

export const objectivesQuery = `
  *[_type == "objectives"][0]{
    sectionTitle,
    intro,
    vision{
      title,
      body
    },
    mission{
      title,
      body
    },
    valuesHeading,
    values[] | order(order asc){
      order,
      title,
      description,
      iconKey
    }
  }
`;

export const countsQuery = `
  *[_type == "counts"][0]{
    sectionTitle,
    stats[] | order(order asc){
      _key,
      order,
      number,
      suffix,
      label,
      description,
      iconKey
    },
    achievements[] | order(order asc){
      order,
      title,
      description,
      iconKey
    }
  }
`;

export const whyUsQuery = `
  *[_type == "whyUs"][0]{
    sectionTitle,
    intro,
    reasons[] | order(order asc){
      order,
      title,
      description,
      features[],
      iconKey
    },
    comparisonHeading,
    comparisonUsLabel,
    comparisonOthersLabel,
    comparisonUsItems[]{
      text
    },
    comparisonOthersItems[]{
      text
    },
    footerStats[] | order(order asc){
      order,
      number,
      label
    }
  }
`;

export const servicesSectionQuery = `
  *[_type == "servicesSection"][0]{
    sectionTitle
  }
`;

export const portfolioSectionQuery = `
  *[_type == "portfolioSection"][0]{
    sectionTitle,
    categories[]{
      order,
      label
    }
  }
`;

export const portfolioItemsQuery = `
  *[_type == "portfolioItem"] | order(order asc){
    "id": _id,
    order,
    title,
    category,
    "description": shortDescription,
    details,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    coverAlt,
    client,
    year,
    duration,
    awards[],
    watchCtaLabel,
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

export const gallerySectionQuery = `
  *[_type == "gallerySection"][0]{
    sectionTitle,
    intro,
    categories[]{
      order,
      label
    },
    viewMoreLink,
    viewMoreLabel
  }
`;

export const galleryItemsQuery = `
  *[_type == "galleryItem"] | order(order asc){
    "id": _id,
    order,
    title,
    category,
    "description": description,
    "image": coalesce(coverImage.asset->url, coverImageUrl),
    coverAlt,
    date,
    location,
    "type": mediaType,
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
    partners[]{
      _key,
      order,
      name,
      "img": coalesce(logo.asset->url, logoUrl),
      logoUrl,
      logoAlt,
      url
    },
    types[] | order(order asc){
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

export const partnershipTypesQuery = `
  *[_type == "partnershipSection"][0]{
    types[] | order(order asc){
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

export const getInTouchQuery = `
  *[_type == "getInTouch"][0]{
    sectionTitle,
    intro,
    contactDetails[] | order(order asc){
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
