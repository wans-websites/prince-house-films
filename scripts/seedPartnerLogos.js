// scripts/seedPartnerLogos.js
//
// Populates the `logo` image asset on the 14 existing partner documents.
//
// The full seed (scripts/seedSanity.js) is deliberately not used for this:
// it writes with createIfNotExists(), which never touches documents that
// already exist, and its --force path would replace whole documents.
//
// This script only ever patches `logo`. Names, order, logoAlt, url and every
// other field are left exactly as they are.
//
//   node scripts/seedPartnerLogos.js            # dry run, no writes
//   node scripts/seedPartnerLogos.js --apply    # perform the updates
//
// Uploads are content-addressed by Sanity, so re-running reuses the same
// asset document instead of creating a duplicate.

import "dotenv/config";
import { createClient } from "@sanity/client";
import { PARTNER_LOGOS } from "./partnerLogos.js";

const EXPECTED_PROJECT_ID = "zsbii2ih";
const EXPECTED_DATASET = "production";

const apply = process.argv.includes("--apply");

const filenameOf = (url) => url.split("/").pop().split("?")[0];

function makeClient() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;

  if (projectId !== EXPECTED_PROJECT_ID || dataset !== EXPECTED_DATASET) {
    throw new Error(
      `Refusing to run: target is ${projectId || "(unset)"}/${dataset || "(unset)"}, ` +
        `expected ${EXPECTED_PROJECT_ID}/${EXPECTED_DATASET}.`
    );
  }
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error("Refusing to run: SANITY_API_TOKEN is not set.");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-19",
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  });
}

const DOC_QUERY = `*[_type == "partner"]{
  _id, name, logoAlt, url, order,
  "assetRef": logo.asset._ref,
  "assetFilename": logo.asset->originalFilename
}`;

async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`download failed: ${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function main() {
  const client = makeClient();
  console.log(`Target: ${EXPECTED_PROJECT_ID}/${EXPECTED_DATASET}`);
  console.log(`Mode:   ${apply ? "APPLY" : "DRY RUN (pass --apply to write)"}\n`);

  const docs = await client.fetch(DOC_QUERY);
  const byId = new Map(docs.map((doc) => [doc._id, doc]));

  const missing = PARTNER_LOGOS.filter((entry) => !byId.has(entry.id)).map((e) => e.id);
  if (missing.length) {
    throw new Error(`Missing partner documents, aborting before any write: ${missing.join(", ")}`);
  }

  const extras = docs.filter((doc) => !PARTNER_LOGOS.some((e) => e.id === doc._id));
  if (extras.length) {
    console.log(`Note: ${extras.length} partner document(s) are not in the target list and will be left alone: ` +
      extras.map((d) => d._id).join(", ") + "\n");
  }

  const results = [];

  for (const { id, url } of PARTNER_LOGOS) {
    const doc = byId.get(id);
    const filename = filenameOf(url);

    try {
      if (doc.assetFilename === filename) {
        results.push({ id, status: "unchanged", detail: `already ${filename}` });
        continue;
      }

      if (!apply) {
        results.push({
          id,
          status: "would-update",
          detail: `${doc.assetRef ? "replace " + doc.assetFilename : "no logo"} -> ${filename}`,
          previous: doc.assetRef || null,
        });
        continue;
      }

      const bytes = await downloadImage(url);
      const asset = await client.assets.upload("image", bytes, { filename });

      await client
        .patch(id)
        .set({
          logo: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
          },
        })
        .commit();

      results.push({
        id,
        status: "updated",
        detail: `${filename} (${asset._id})`,
        previous: doc.assetRef || null,
      });
    } catch (error) {
      results.push({ id, status: "failed", detail: error.message });
    }
  }

  console.log("Partner                        Status        Detail");
  console.log("-".repeat(96));
  for (const r of results) {
    console.log(`${r.id.padEnd(30)} ${r.status.padEnd(13)} ${r.detail}`);
  }

  const failed = results.filter((r) => r.status === "failed");
  const updated = results.filter((r) => r.status === "updated");
  const unchanged = results.filter((r) => r.status === "unchanged");
  const pending = results.filter((r) => r.status === "would-update");

  console.log(
    `\n${apply ? "Updated" : "Would update"}: ${apply ? updated.length : pending.length}, ` +
      `unchanged: ${unchanged.length}, failed: ${failed.length}`
  );

  if (apply) {
    const rollback = results
      .filter((r) => r.status === "updated")
      .map((r) => ({ _id: r.id, previousLogoAssetRef: r.previous }));
    if (rollback.length) {
      console.log("\nPrevious logo values (rollback record):");
      console.log(JSON.stringify(rollback, null, 2));
    }
  }

  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`\nAborted: ${error.message}`);
  process.exit(1);
});
