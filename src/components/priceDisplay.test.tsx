import {
  cleanup,
  render,
  screen,
  waitForElement,
} from "@testing-library/react";
import React from "react";
import { PriceDisplay } from "./priceDisplay";

describe("Price Display component", () => {
  beforeEach(async () => {
    render(
      <PriceDisplay
        data={{
          latestPrice: 300.0,
          open: 200.0,
        }}
        ticker={"MSFT"}
      />
    );
    waitForElement(() => screen.getByText("MSFT"));
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
