import React from "react";
import {
  render,
  cleanup,
  screen,
  prettyDOM,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import { PriceDisplay } from "./priceDisplay";

describe("Price Display component", () => {
  let app;

  beforeEach(async () => {
    const { container } = render(
      <PriceDisplay
        data={{
          latestPrice: 100.0,
          open: 50.0,
        }}
        ticker={"MSFT"}
      />
    );
    app = container;
    await waitForElement(() => screen.getByText("MSFT"));
    console.log(prettyDOM(app));
  });

  afterEach(cleanup);

  test("Correct price and percent difference is displayed properly ", () => {
    const priceDisplay = screen.getByText("100.00");
    expect(priceDisplay).toBeInTheDocument();
  });
});
