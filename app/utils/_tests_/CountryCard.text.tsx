import { render, screen, fireEvent } from "@testing-library/react";
import CountryCard from "../../components/CountryCard";
import { Country } from "../../types/country";

const mockCountry: Country = {
  name: { common: "France" },
  flags: { png: "https://flagcdn.com/w320/fr.png" },
};

describe("CountryCard Component", () => {
  it("renders country name and flag", () => {
    render(<CountryCard country={mockCountry} onClick={() => {}} />);

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByAltText("France flag")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClickMock = jest.fn();
    render(<CountryCard country={mockCountry} onClick={onClickMock} />);

    fireEvent.click(screen.getByTestId("country-card"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
