// src/lib/mediaUtils.js

export const getYouTubeId = (url) => {
  if (!url || typeof url !== "string") return null;
  const patterns = [
    /(?:youtu\.be\/)([A-Za-z0-9_-]{11})/,
    /(?:youtube\.com\/(?:embed|v|shorts|live)\/)([A-Za-z0-9_-]{11})/,
    /[?&]v=([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
};

export const getVimeoId = (url) => {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/vimeo\.com\/(?:.*\/)?(?:video\/)?(\d{6,})/);
  return m ? m[1] : null;
};

export const isDirectVideoUrl = (url) =>
  !!url && /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i.test(url);

export const getVideoProvider = (url) => {
  if (getYouTubeId(url)) return "youtube";
  if (getVimeoId(url)) return "vimeo";
  if (isDirectVideoUrl(url)) return "direct";
  return "unknown";
};

export const getVideoEmbedUrl = (url, provider) => {
  if (provider === "youtube") {
    const id = getYouTubeId(url);
    return id
      ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
      : null;
  }
  if (provider === "vimeo") {
    const id = getVimeoId(url);
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null;
  }
  return null;
};

export const getVideoThumbnail = (url, provider) => {
  if (provider === "youtube") {
    const id = getYouTubeId(url);
    return id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : null;
  }
  if (provider === "vimeo") {
    const id = getVimeoId(url);
    return id ? `https://vumbnail.com/${id}_large.jpg` : null;
  }
  return null;
};
