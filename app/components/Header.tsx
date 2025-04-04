"use client";
import React from "react";

type Props = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const Header: React.FC<Props> = ({ darkMode, toggleDarkMode }) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">🌍 Country Explorer</h1>
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-700 transition"
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  </div>
);

export default Header;
