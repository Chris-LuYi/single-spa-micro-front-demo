import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Component from "../index";
import { mountTest, ReduxWrapper } from "../../../test/shared";
import { getStore } from "../../../store";

const WrappedComponent = () => (
  <ReduxWrapper
    initialEntries={["/ticket/100"]}
    initialIndex={0}
    store={getStore({
      ticket: {
        ids: [100],
        entities: {
          100: {
            id: 100,
            text: "Test Ticket Default",
            status: "in-progress",
            comments: [],
          },
        },
      },
    })}
  >
    <Component />
  </ReduxWrapper>
);

mountTest(WrappedComponent);

describe("Ticket Detail", () => {
  it("should be in the document", () => {
    const { getByText } = render(<WrappedComponent />);
    expect(getByText(/Test Ticket Default/i)).toBeInTheDocument();
  });

  it("should not able to submit when empty comment", () => {
    const { container } = render(<WrappedComponent />);
    const done = container.querySelector("button");
    fireEvent.click(done, { button: 1 });

    const comment = container.querySelector("textarea");
    expect(comment.className).toBe("error");
  });
});
