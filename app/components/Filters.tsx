"use client";
import React from "react";

type Props = {
  search: string;
  setSearch: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
  sortOrder: "asc" | "desc";
  toggleSortOrder: () => void;
  regions: string[];
};

const Filters: React.FC<Props> = ({ search, setSearch, region, setRegion, sortOrder, toggleSortOrder, regions }) => (
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
      onClick={toggleSortOrder}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Sort by Population ({sortOrder})
    </button>
  </div>
);

export default Filters;
