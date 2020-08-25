import {
  cleanup,
  render,
  screen,
  waitForElement,
} from "@testing-library/react";
import React from "react";
import { LatestNews } from "./latestNews";

jest.mock("./componentHooks/useNewsSelector", () => ({
  useNewsSelector: () => {
    return [
      {
        headline: "News Article 1",
        url: "https://www.article1.com",
        datetime: Date.now() - 60001,
        source: "Article1Source",
      },
      {
        headline: "News Article 2",
        url: "https://www.article2.com",
        datetime: Date.now() - 60001,
        source: "Article2Source",
      },
      {
        headline: "News Article 3",
        url: "https://www.article3.com",
        datetime: Date.now() - 60001,
        source: "Article3Source",
      },
      {
        headline: "News Article 4",
        url: "https://www.article4.com",
        datetime: Date.now() - 60001,
        source: "Article4Source",
      },
      {
        headline: "News Article 5",
        url: "https://www.article5.com",
        datetime: Date.now() - 60001,
        source: "Article5Source",
      },
    ];
  },
}));

describe("Latest News component", () => {
  beforeEach(async () => {
    render(<LatestNews />);
    await waitForElement(() => screen.getByText("News Article 1"));
  });

  test("Company data is rendered", () => {
    const latestNewsHeader = screen.getByText("LATEST NEWS");
    expect(latestNewsHeader).toBeInTheDocument();
    const newsArticleHeadline = screen.getByText("News Article 1");
    expect(newsArticleHeadline).toBeInTheDocument();
    const articleSourceAndTime = screen.getByText(
      "1 minute ago - Article1Source"
    );
    expect(articleSourceAndTime).toBeInTheDocument();
  });

  test("Headline links redirect properly ", () => {
    const articleLinks = screen.getAllByRole("link");
    const validArticleLinks = [
      "https://www.article1.com/",
      "https://www.article2.com/",
      "https://www.article3.com/",
      "https://www.article4.com/",
      "https://www.article5.com/",
    ];
    const validArticleHeadlines = [
      "News Article 1",
      "News Article 2",
      "News Article 3",
      "News Article 4",
      "News Article 5",
    ];
    for (let i = 0; i < validArticleLinks.length; i++) {
      expect(articleLinks[i].href).toBe(validArticleLinks[i]);
      expect(articleLinks[i].textContent).toBe(validArticleHeadlines[i]);
    }
  });
});
