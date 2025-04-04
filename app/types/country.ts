export type Country = {
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
  