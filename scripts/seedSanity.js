// scripts/seedSanity.js

import "dotenv/config";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: "2025-02-19",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log("Seeding Sanity...");

  await client.createOrReplace({
    _id: "hero-singleton",
    _type: "hero",
    title: "Where visual storytelling",
    highlightedText: "meets strategy",
    ctaText: "Start Your Project",
    ctaLink: "#contact",
    backgroundType: "video",
    backgroundVideoUrl:
      "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/hero_tycjh1.mov",
  });

  const services = [
    {
      _id: "service-creative",
      title: "Creative Content",
      text: "Engaging digital content designed for social media, campaigns, and brand storytelling that captures attention.",
      icon: "pen",
      featured: true,
      orderRank: 1,
      backgroundType: "videoUrl",
      backgroundVideoUrl:
        "https://res.cloudinary.com/dlzstmm4e/image/upload/v1772016318/creativeContent.gif",
      mediaItems: [
        {
          _key: "creative-1",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_9459_yplb1m.mp4",
          externalUrl:
            "https://www.instagram.com/reel/DAyOtJ7IZj4/?igsh=N3ZjajVlNjVrY3Ro",
        },
        {
          _key: "creative-2",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_9460_in27nw.mp4",
        },
        {
          _key: "creative-3",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_9458_iyqbut.mp4",
        },
        {
          _key: "creative-4",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_9462_oxhb9t.mp4",
        },
        {
          _key: "creative-5",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_9461_iktmk1.mp4",
        },
        {
          _key: "creative-6",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_2492_nrejko.mp4",
        },
        {
          _key: "creative-7",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_9463_buc6tr.mp4",
        },
      ],
    },
    {
      _id: "service-motion",
      title: "Motion Graphics",
      text: "Dynamic animations, explainer videos, and cinematic title sequences that bring concepts to life.",
      icon: "slideshow",
      featured: false,
      orderRank: 2,
      backgroundType: "videoUrl",
      backgroundVideoUrl:
        "https://res.cloudinary.com/dlzstmm4e/image/upload/v1772016318/motion.gif",
      mediaItems: [
        {
          _key: "motion-1",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/Kara_330ml_1_kkhzrr.mp4",
        },
        {
          _key: "motion-2",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/Vege_Wash_kektrg.mp4",
        },
        {
          _key: "motion-3",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/1000254718_xjijny.mp4",
        },
        {
          _key: "motion-4",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/KARA_coconut_ad_wwqamr.mp4",
        },
        {
          _key: "motion-5",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/ste_ggjgds.mp4",
        },
        {
          _key: "motion-6",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/Kara_Coconut_oil_2_gboknz.mp4",
        },
      ],
    },
    {
      _id: "service-graphic",
      title: "Graphic Design",
      text: "Visual identity, branding, and design systems that communicate your brand's essence effectively.",
      icon: "palette",
      featured: false,
      orderRank: 3,
      backgroundType: "videoUrl",
      backgroundVideoUrl:
        "https://res.cloudinary.com/dlzstmm4e/image/upload/v1772016318/graphic_o3iezn.png",
      mediaItems: [
        {
          _key: "graphic-1",
          type: "image",
          imageUrl:
            "https://res.cloudinary.com/dlzstmm4e/image/upload/v1770377544/WhatsApp_Image_2026-01-16_at_07.59.10_fmouyf.jpg",
        },
        {
          _key: "graphic-2",
          type: "image",
          imageUrl:
            "https://res.cloudinary.com/dlzstmm4e/image/upload/v1770377544/WhatsApp_Image_2026-01-16_at_07.59.11_1_zlwhi3.jpg",
        },
        {
          _key: "graphic-3",
          type: "image",
          imageUrl:
            "https://res.cloudinary.com/dlzstmm4e/image/upload/v1770377544/WhatsApp_Image_2026-01-16_at_07.59.11_2_whgb2g.jpg",
        },
        {
          _key: "graphic-4",
          type: "image",
          imageUrl:
            "https://res.cloudinary.com/dlzstmm4e/image/upload/v1770377544/WhatsApp_Image_2026-01-16_at_07.59.11_ywdd4u.jpg",
        },
      ],
    },
    {
      _id: "service-event",
      title: "Event Coverage",
      text: "Where Visual storytelling meets strategy",
      icon: "video",
      featured: true,
      orderRank: 4,
      backgroundType: "videoUrl",
      backgroundVideoUrl:
        "https://res.cloudinary.com/dlzstmm4e/image/upload/v1772016829/event_iuwskj.gif",
      mediaItems: [
        {
          _key: "event-1",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_9466_dffpzd.mp4",
        },
        {
          _key: "event-2",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_8084_icevnc.mp4",
        },
        {
          _key: "event-3",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/IMG_7951_g58a5f.mp4",
        },
        {
          _key: "event-4",
          type: "video",
          videoUrl:
            "https://res.cloudinary.com/dlzstmm4e/video/upload/v1770377544/ezyZip-2_y7hvbg.mp4",
        },
      ],
    },
  ];

  for (const service of services) {
    await client.createOrReplace({
      _id: service._id,
      _type: "service",
      ...service,
    });
  }

  console.log("Seeding complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
