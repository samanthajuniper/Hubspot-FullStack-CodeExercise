import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  const renderApp = () => {
    render(<App />);
    const { getByText } = screen;
    const title = getByText(/Apps/i);
    return {
      title
    };
  };

  it("renders the page title", () => {
    const { title } = renderApp();
    expect(title).toBeInTheDocument();
  });
});