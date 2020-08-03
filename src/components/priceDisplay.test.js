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
          latestPrice: 300.0,
          open: 200.0,
        }}
        ticker={"MSFT"}
      />
    );
    app = container;
    waitForElement(() => screen.getByText("MSFT"));
    console.log(prettyDOM(app));
  });

  afterEach(cleanup);

  test("Correct price and percent difference is displayed properly ", () => {
    const priceDisplay = screen.getByText("300");
    expect(priceDisplay).toBeInTheDocument();
    const valueChangeDisplay = screen.getByText("100.00");
    expect(valueChangeDisplay).toBeInTheDocument();
    const percentChangeDisplay = screen.getByText("50.00");
    expect(percentChangeDisplay).toBeInTheDocument();
  });
});
