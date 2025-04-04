"use client";
import React from "react";
import { Country } from "../types/country";
import Image from "next/image";

type Props = {
    country: Country;
    onClose: () => void;
    darkMode: boolean;
};

const CountryDetail: React.FC<Props> = ({ country, onClose, darkMode }) => (
    <div
        className={`fixed inset-0 ${darkMode ? "bg-black bg-opacity-60" : "bg-black bg-opacity-50"} flex justify-center items-center p-6`}
    >
        <div
            className={`relative rounded-lg shadow-lg p-6 max-w-md w-full ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
        >
            <button className="absolute top-4 right-4 text-xl font-bold" onClick={onClose}>
                &times;
            </button>
            <div className="flex justify-center">
                <div className="relative w-32 h-24">
                    <Image
                        src={country.flags.png}
                        alt={country.name.common}
                        fill
                        className="rounded object-contain"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            </div>
            <h2 className="text-2xl font-bold text-center mt-2">{country.name.common}</h2>
            <p className="text-center opacity-80">{country.name.official}</p>
            <div className="mt-4 space-y-2">
                <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
                <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> {country.region} - {country.subregion}</p>
                <p><strong>Time Zones:</strong> {country.timezones?.join(", ") || "N/A"}</p>
                <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
                <p><strong>Currencies:</strong> {country.currencies
                    ? Object.values(country.currencies).map((curr) => `${curr.name} (${curr.symbol})`).join(", ")
                    : "N/A"}
                </p>
            </div>
            <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    </div>
);

export default CountryDetail;
