import { useState, useEffect } from "react";

const cache: Record<string, any> = {};

export const useFetchWithCache = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cache[url]) {
        setData(cache[url]);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API Error: ${res.status} - ${res.statusText}`);
        }

        const json = await res.json();
        cache[url] = json;
        setData(json);
      } catch (err: any) {
        setError(
          "The API seems to be down or experiencing issues. This is outside our control. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
