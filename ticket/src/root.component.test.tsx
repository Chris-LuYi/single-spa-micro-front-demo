import React from "react";
import { render } from "@testing-library/react";
import Root from "./root.component";
import { mountTest } from "./test/shared";

describe("Home Page", () => {
  mountTest(Root);

  it("should be in the document", () => {
    const { getByText } = render(<Root />);
    expect(getByText(/Add/i)).toBeInTheDocument();
  });
});
