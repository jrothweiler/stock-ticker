import React from "react";
import { render, screen } from "@testing-library/react";
import { CompanyBadges } from "./companyBadges";

jest.mock("./componentHooks/useCompanyBadgeInfo", () => ({
  useCompanyBadgeInfo: () => {
    return ["NASDAQ", "Technology", "USD"];
  },
}));

// Tests for search bar functionality
// Done as integration tests due to the dependencies across the
// whole experience
describe("Company badges component", () => {
  beforeEach(async () => {
    render(<CompanyBadges />);
  });

  test("Renders the data given", () => {
    expect(screen.getByText("NASDAQ")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });
});
