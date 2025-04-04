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
      } else {
        try {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Failed to fetch");
          const json = await res.json();
          cache[url] = json;
          setData(json);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
