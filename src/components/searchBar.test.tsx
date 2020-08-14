import React from "react";
import {
  render,
  screen,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import App from "../App";

// Tests for search bar functionality
// Done as integration tests due to the dependencies across the
// whole experience
describe("Search bar component", () => {
  beforeEach(async () => {
    render(<App />);
    await waitForElement(() => screen.getByText("Apple, Inc."));
  });

  test("Clicking on the company text focuses the form", () => {
    const companyText = screen.getByText("Apple, Inc.");
    fireEvent.click(companyText);
    const input = screen.getByRole("textbox");
    expect(input === document.activeElement).toBe(true);
  });

  test("focusing on the form removes the company text", () => {
    const companyText = screen.queryByText("Apple, Inc.");
    const input = screen.queryByRole("textbox");
    expect(companyText).toBeInTheDocument();
    fireEvent.focus(input);
    expect(companyText).not.toBeInTheDocument();
  });

  test("Badly formatted symbols are stopped client side", () => {
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "jklasjdf&^^^" } });
    fireEvent.submit(input);

    // submitting causes error text to show
    expect(
      screen.getByText(
        "Not a valid input, searches should contain only letters"
      )
    ).toBeInTheDocument();

    // value is still in the box
    expect(input.value).toBe("jklasjdf&^^^");
  });

  test("Nonexistent symbols are stopped server side", async () => {
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "BADSYMBOL" } });
    fireEvent.submit(input);

    // submitting causes error text to show
    await waitForElement(() =>
      screen.getByText("Error in search: Symbol BADSYMBOL does not exist")
    );

    // value is removed from the box, since the search did go through
    expect(input.value).toBe("");
    // old data is still there, since the search failed
    expect(screen.queryByText("Apple, Inc.")).toBeInTheDocument();
  });

  test("Unfocusing when there is no text shows the company name again", async () => {
    const companyText = screen.getByText("Apple, Inc.");
    const input = screen.queryByRole("textbox");
    expect(screen.getByText("Apple, Inc.")).toBeInTheDocument();
    fireEvent.click(companyText);
    expect(input === document.activeElement).toBe(true);
    expect(screen.queryByText("Apple, Inc.")).not.toBeInTheDocument();
    input.blur();

    await waitForElement(() => input !== document.activeElement);
    expect(screen.getByText("Apple, Inc.")).toBeInTheDocument();
  });

  test("Unfocusing when there is no text shows the company name again", async () => {
    const companyText = screen.getByText("Apple, Inc.");
    const input = screen.queryByRole("textbox") as HTMLInputElement;
    expect(screen.getByText("Apple, Inc.")).toBeInTheDocument();
    fireEvent.click(companyText);
    expect(input === document.activeElement).toBe(true);
    expect(screen.queryByText("Apple, Inc.")).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: "hi" } });
    input.blur();

    await waitForElement(() => input !== document.activeElement);

    expect(screen.queryByText("Apple, Inc.")).not.toBeInTheDocument();
    expect(input.value).toBe("hi");
  });

  test("Searching for a new symbol updates the experience", async () => {
    const input = screen.getByRole("textbox") as HTMLInputElement;

    expect(screen.getByText("Apple, Inc.")).toBeInTheDocument();
    // initially shows apple's price
    expect(screen.getByText("387.46")).toBeInTheDocument();
    // Originally has apple news
    expect(screen.getByText("Apple headline")).toBeInTheDocument();
    // originally has apple's description
    expect(screen.getByText("Apple description")).toBeInTheDocument();
    // originally has apple's peers
    expect(screen.getByText("PHQ")).toBeInTheDocument();
    // originally has apple's stats (dividend yield in this case)
    expect(screen.getByText("0.85%")).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "WORK" } });
    fireEvent.submit(input);

    // submitting causes error text to show
    await waitForElement(() => screen.getByText("Slack Technologies, Inc."));

    // value is removed from the box, since the search did go through
    expect(input.value).toBe("");

    // Apple header is no longer there
    expect(screen.queryByText("Apple, Inc.")).not.toBeInTheDocument();
    // new price is shown
    expect(screen.getByText("29.70")).toBeInTheDocument();
    // Now has slack news
    expect(screen.getByText("Slack headline")).toBeInTheDocument();
    // Now has slack's description
    expect(screen.getByText("Slack description")).toBeInTheDocument();
    // now has slack's peers
    expect(screen.getByText("HOVPCI")).toBeInTheDocument();
    // Now has slack's stats (dividend yield in this case)
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  test("autocomplete works and can initiate a search", async () => {
    expect(screen.getByText("Apple, Inc.")).toBeInTheDocument();
    expect(screen.queryByText("Suggestion Inc")).not.toBeInTheDocument();

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "WORK" } });

    await waitForElement(() => screen.getByText("Suggestion Inc"));

    fireEvent.click(screen.getByText("Suggestion Inc"));

    // the above click should launch a search that updates the UI
    await waitForElement(() => screen.getByText("Slack Technologies, Inc."));
  });
});
