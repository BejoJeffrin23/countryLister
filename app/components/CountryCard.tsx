"use client";
import React from "react";
import { Country } from "../types/country";
import Image from "next/image";

type Props = {
    country: Country;
    onClick: () => void;
};

const CountryCard: React.FC<Props> = ({ country, onClick }) => (
    <div
        className="border rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition dark:bg-gray-800"
        onClick={onClick}
    >
        <div className="relative w-36 h-24">
            <Image
                src={country.flags.png}
                alt={country.name.common}
                fill
                className="rounded"
                sizes="(max-width: 768px) 100vw, 33vw"
            />
        </div>

        <h3 className="text-lg font-semibold mt-2">{country.name.common}</h3>
        <p>Capital: {country.capital?.[0] || "N/A"}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
    </div>
);

export default CountryCard;
