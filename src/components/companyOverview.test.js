import React from "react";
import * as redux from "react-redux";
import {
  render,
  cleanup,
  screen,
  prettyDOM,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import App from "../App";
import { CompanyOverview } from "./companyOverview";
import { useCompanySelector } from "./componentHooks/useCompanySelector";
import { useTickerSelector } from "./componentHooks/useTickerSelector";
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
  let app;

  beforeEach(async () => {
    const { container } = render(<CompanyOverview />);
    app = container;
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
    console.log(`log ${websiteLink.textContent}`);
    expect(websiteLink.textContent).toBe("https://www.apple.com");
  });
});
