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
import { LatestNews } from "./latestNews";
import { useNewsSelector } from "./componentHooks/useNewsSelector";

jest.mock("./componentHooks/useNewsSelector", () => ({
  useNewsSelector: () => {
    return [
      {
        headline: "News Article 1",
        url: "https://www.article1.com",
        datetime: "100000000",
        source: "Article1Source",
      },
      {
        headline: "News Article 2",
        url: "https://www.article2.com",
        datetime: "100000000",
        source: "Article2Source",
      },
      {
        headline: "News Article 3",
        url: "https://www.article3.com",
        datetime: "100000000",
        source: "Article3Source",
      },
      {
        headline: "News Article 4",
        url: "https://www.article4.com",
        datetime: "100000000",
        source: "Article4Source",
      },
      {
        headline: "News Article 5",
        url: "https://www.article5.com",
        datetime: "100000000",
        source: "Article5Source",
      },
    ];
  },
}));

describe("Latest News component", () => {
  let app;

  beforeEach(async () => {
    const { container } = render(<LatestNews />);
    app = container;
    await waitForElement(() => screen.getByText("News Article 1"));
  });

  afterEach(cleanup);

  test("Company data is rendered", () => {
    console.log(prettyDOM(app));
    const latestNewsHeader = screen.getByText("LATEST NEWS");
    expect(latestNewsHeader).toBeInTheDocument();
    const newsArticleHeadline = screen.getByText("News Article 1");
    expect(newsArticleHeadline).toBeInTheDocument();
    const articleUrl = screen.getByText("50 years ago - Article1Source");
    expect(articleUrl).toBeInTheDocument();
  });
});
