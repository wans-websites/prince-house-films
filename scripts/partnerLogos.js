// scripts/partnerLogos.js
//
// Single definition of the partner logo mapping, shared by the seed data and
// the dedicated logo script so the two cannot drift apart.

const CLOUDINARY = "https://res.cloudinary.com/dlzstmm4e/image/upload";

// Document id -> supplied logo file. The `drmatress` spelling in the file name
// is intentional; the document id is partner-drmattress.
export const PARTNER_LOGOS = [
  { id: "partner-megagrowth", url: `${CLOUDINARY}/v1795199607/megagrowth_ni4f92.png` },
  { id: "partner-vspa", url: `${CLOUDINARY}/v1795199607/vspa_r8iusz.png` },
  { id: "partner-tworivers", url: `${CLOUDINARY}/v1795199607/tworivers_pfqgoo.png` },
  { id: "partner-orient", url: `${CLOUDINARY}/v1795199606/orient_tacnql.png` },
  { id: "partner-sarit", url: `${CLOUDINARY}/v1795199606/sarit_df4epd.png` },
  { id: "partner-titi", url: `${CLOUDINARY}/v1795199606/titi_qk0veq.png` },
  { id: "partner-prestige", url: `${CLOUDINARY}/v1795199606/prestige_qe25ja.png` },
  { id: "partner-drmattress", url: `${CLOUDINARY}/v1795199606/drmatress_ykmtcp.png` },
  { id: "partner-lcwaikiki", url: `${CLOUDINARY}/v1795199606/lcwaikiki_zz3jqb.png` },
  { id: "partner-darling", url: `${CLOUDINARY}/v1795199605/darling_ikfc2k.png` },
  { id: "partner-furnitureplace", url: `${CLOUDINARY}/v1795199606/furnitureplace_vaweq0.png` },
  { id: "partner-delish", url: `${CLOUDINARY}/v1795199605/delish_mmyiak.png` },
  { id: "partner-eabl", url: `${CLOUDINARY}/v1795199606/eabl_fmzcy7.jpg` },
  { id: "partner-cocacola", url: `${CLOUDINARY}/v1795199605/cocacola_dxytsw.jpg` },
];

export const partnerLogoUrl = (id) => PARTNER_LOGOS.find((entry) => entry.id === id)?.url;
