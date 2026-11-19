// src/lib/useSanityData.js
// Data-fetch hook with built-in fallback to current hardcoded constants.
// Consumed by Batch 4 components. App.jsx hero/services fetch is untouched.

import { useEffect, useState } from "react";
import { sanityClient } from "./sanity";

export function useSanityData(query, params, fallback) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const result = await sanityClient.fetch(query, params, {
          token: undefined,
          ...(controller.signal ? { signal: controller.signal } : {}),
        });

        if (cancelled) return;

        const isEmpty =
          result === null ||
          result === undefined ||
          (Array.isArray(result) && result.length === 0);

        setData(isEmpty ? fallback : result);
        setError(null);
      } catch (err) {
        if (cancelled || err.name === "AbortError") return;
        setData(fallback);
        setError(err);
        console.error("Sanity fetch failed, using fallback:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [query, params, fallback]);

  return { data, loading, error };
}
