"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";

type Country = {
  cca3: string;
  name: { common: string; official: string };
  capital?: string[];
  population: number;
  region: string;
  subregion?: string;
  flags: { png: string };
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  timezones?: string[];
};

const ITEMS_PER_LOAD = 20;

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [visibleCountries, setVisibleCountries] = useState<Country[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(ITEMS_PER_LOAD);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("theme") === "dark";
  });


  useEffect(() => {
    axios
      .get<Country[]>("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setFilteredCountries(response.data);
        setVisibleCountries(response.data.slice(0, ITEMS_PER_LOAD));
        setCurrentIndex(ITEMS_PER_LOAD);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    let filtered = countries;

    if (search) {
      filtered = filtered.filter(
        (c) =>
          c.name.common.toLowerCase().includes(search.toLowerCase()) ||
          (c.capital && c.capital.some((cap) => cap.toLowerCase().includes(search.toLowerCase())))
      );
    }

    if (region) {
      filtered = filtered.filter((c) => c.region === region);
    }

    filtered = filtered.sort((a, b) =>
      sortOrder === "asc" ? a.population - b.population : b.population - a.population
    );

    setFilteredCountries(filtered);
    setVisibleCountries(filtered.slice(0, ITEMS_PER_LOAD));
    setCurrentIndex(ITEMS_PER_LOAD);
  }, [search, region, sortOrder, countries]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentIndex < filteredCountries.length) {
          setVisibleCountries((prev) => [
            ...prev,
            ...filteredCountries.slice(currentIndex, currentIndex + ITEMS_PER_LOAD),
          ]);
          setCurrentIndex((prev) => prev + ITEMS_PER_LOAD);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [currentIndex, filteredCountries]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const regions = useMemo(() => {
    const uniqueRegions = new Set(countries.map((country) => country.region));
    return Array.from(uniqueRegions).filter(Boolean);
  }, [countries]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className={`container mx-auto p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🌍 Country Explorer</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-700 transition"
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or capital"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3 bg-gray-200 dark:bg-gray-800"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4 bg-gray-200 dark:bg-gray-800"
        >
          <option value="">All Regions</option>
          {regions.map((reg) => (
            <option key={reg} value={reg}>
              {reg}
            </option>
          ))}
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sort by Population ({sortOrder})
        </button>
      </div>

      {/* Country List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleCountries.map((country) => (
          <div
            key={country.cca3}
            className="border rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition dark:bg-gray-800"
            onClick={() => setSelectedCountry(country)}
          >
            <img src={country.flags.png} alt={country.name.common} className="w-24 h-16 rounded" />
            <h3 className="text-lg font-semibold mt-2">{country.name.common}</h3>
            <p>Capital: {country.capital?.[0] || "N/A"}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
          </div>
        ))}
      </div>
      {selectedCountry && (
        <div
          className={`fixed inset-0 ${darkMode ? "bg-black bg-opacity-60" : "bg-black bg-opacity-50"
            } flex justify-center items-center p-6`}
        >
          <div
            className={`relative rounded-lg shadow-lg p-6 max-w-md w-full ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
              }`}
          >
            <button
              className="absolute top-4 right-4 text-xl font-bold"
              onClick={() => setSelectedCountry(null)}
            >
              &times;
            </button>
            <img
              src={selectedCountry.flags.png}
              alt={selectedCountry.name.common}
              className="w-32 h-24 mx-auto"
            />
            <h2 className="text-2xl font-bold text-center mt-2">
              {selectedCountry.name.common}
            </h2>
            <p className="text-center opacity-80">{selectedCountry.name.official}</p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>Capital:</strong> {selectedCountry.capital?.[0] || "N/A"}
              </p>
              <p>
                <strong>Population:</strong> {selectedCountry.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {selectedCountry.region} - {selectedCountry.subregion}
              </p>
              <p>
                <strong>Time Zones:</strong> {selectedCountry.timezones?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Languages:</strong>{" "}
                {selectedCountry.languages
                  ? Object.values(selectedCountry.languages).join(", ")
                  : "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {selectedCountry.currencies
                  ? Object.values(selectedCountry.currencies)
                    .map((curr) => `${curr.name} (${curr.symbol})`)
                    .join(", ")
                  : "N/A"}
              </p>
            </div>
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              onClick={() => setSelectedCountry(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={observerRef} className="h-10 w-full"></div>
    </div>
  );
};

export default Home;
