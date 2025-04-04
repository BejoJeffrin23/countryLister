import { sortCountries } from "../functions/sortCountry"; // Adjust path if necessary
import { Country } from "../../types/country"; 

describe("sortCountries function", () => {
  const mockCountries: Country[] = [
    { name: { common: "Country A" }, population: 500000 },
    { name: { common: "Country B" }, population: 1000000 },
    { name: { common: "Country C" }, population: 200000 },
  ] as Country[];

  test("sorts countries in ascending order of population", () => {
    const sorted = sortCountries(mockCountries, "asc");
    expect(sorted.map((c) => c.population)).toEqual([200000, 500000, 1000000]);
  });

  test("sorts countries in descending order of population", () => {
    const sorted = sortCountries(mockCountries, "desc");
    expect(sorted.map((c) => c.population)).toEqual([1000000, 500000, 200000]);
  });

  test("does not mutate the original array", () => {
    const original = [...mockCountries];
    sortCountries(mockCountries, "asc");
    expect(mockCountries).toEqual(original);
  });
});
