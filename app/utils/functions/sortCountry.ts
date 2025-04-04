import { Country } from "../../types/country";

export const sortCountries = (countries: Country[], order: "asc" | "desc") => {
  return [...countries].sort((a, b) =>
    order === "asc" ? a.population - b.population : b.population - a.population
  );
};