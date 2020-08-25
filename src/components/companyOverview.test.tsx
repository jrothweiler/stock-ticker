import React from "react";
import {
  render,
  cleanup,
  screen,
  waitForElement,
} from "@testing-library/react";
import { CompanyOverview } from "./companyOverview";

jest.mock("./componentHooks/useCompanySelector", () => ({
  useCompanySelector: () => {
    return {
      companyName: "Apple, Inc.",
      website: "https://www.apple.com",
      description: "Apple Description",
    };
  },
}));
jest.mock("./componentHooks/useTickerSelector", () => ({
  useTickerSelector: () => {
    return "AAPL";
  },
}));

describe("Company Overview component", () => {
  beforeEach(async () => {
    render(<CompanyOverview />);
    await waitForElement(() => screen.getByText("Apple, Inc. (AAPL)"));
  });

  afterEach(cleanup);

  test("Company data is rendered", () => {
    const companyOverviewHeader = screen.getByText("COMPANY OVERVIEW");
    expect(companyOverviewHeader).toBeInTheDocument();
    const companyText = screen.getByText("Apple, Inc. (AAPL)");
    expect(companyText).toBeInTheDocument();
    const companyWebsite = screen.getByText("https://www.apple.com");
    expect(companyWebsite).toBeInTheDocument();
    const companyDescription = screen.getByText("Apple Description");
    expect(companyDescription).toBeInTheDocument();
  });

  test("Website link redirects properly", () => {
    const websiteLink = screen.getByRole("link");
    expect(websiteLink.textContent).toBe("https://www.apple.com");
  });
});
