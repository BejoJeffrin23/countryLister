"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import CountryCard from "./components/CountryCard";
import CountryModal from "./components/CountryDetail";
import { useDarkMode } from "./hooks/useDarkMode";
import { useFetchWithCache } from "./hooks/useFetchAndCache";
import { ITEMS_PER_LOAD } from "./utils/constants";
import { Country } from "./types/country";
import { sortCountries } from "./utils/functions/sortCountry";

const Home = () => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [darkMode, setDarkMode] = useDarkMode();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const { data, loading, error } = useFetchWithCache<Country[]>(`${baseUrl}/api/countries`);
  const countries = data ?? [];

  const filtered = useMemo(() => {
    const query = search.toLowerCase();

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query) ||
      country.capital?.[0]?.toLowerCase().includes(query)
    );

    return sortCountries(filteredCountries, sortOrder);
  }, [countries, search, region, sortOrder]);

  const visibleCountries = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filtered.length) {
          setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [filtered.length, visibleCount]);

  const regions = Array.from(new Set(countries.map((c) => c.region))).filter(Boolean);

  return (
    <main className="min-h-screen px-4 md:px-10 py-6 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <Filters
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        sortOrder={sortOrder}
        toggleSortOrder={() =>
          setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
        }
        regions={regions}
      />

      {loading ? (
        <p className="text-center mt-10">Loading countries...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-10">Error: {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onClick={() => setSelectedCountry(country)}
              />
            ))}
          </div>

          <div ref={observerRef} className="h-10 w-full"></div>
        </>
      )}

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          darkMode={darkMode}
        />
      )}
    </main>
  );
};

export default Home;
