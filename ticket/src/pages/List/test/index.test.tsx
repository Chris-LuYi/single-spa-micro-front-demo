import React from "react";
import { render, fireEvent, configure, cleanup } from "@testing-library/react";
import Component from "../index";
import { act } from "react-dom/test-utils";

import { mountTest, sleep, ReduxWrapper } from "../../../test/shared";

const WrappedComponent = () => (
  <ReduxWrapper>
    <Component />
  </ReduxWrapper>
);
mountTest(WrappedComponent);

describe("Ticket List", () => {
  it("should be in the document", () => {
    const { getByText } = render(<WrappedComponent />);
    expect(getByText(/Add/i)).toBeInTheDocument();
  });
  it("should be empty by default", () => {
    const { container } = render(<WrappedComponent />);
    const tickets = container.querySelectorAll('div[class="col-items"]');
    tickets.forEach((element) => {
      expect(element).toBeEmptyDOMElement();
    });
  });

  it("can add ticket", async () => {
    const { container } = render(<WrappedComponent />);
    const input = container.querySelector('input[data-id="add-input"]') as HTMLInputElement;
    const add = container.querySelector('button[data-id="add-button"]') as HTMLButtonElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(add).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Test Ticket" } });

    expect(input.value).toBe("Test Ticket");

    fireEvent.click(add, { button: 1 });

    const processingTickets = container.querySelector('div[data-type="ticket-list"] > .col-items');
    expect(processingTickets).toBeEmptyDOMElement();
    await sleep(2000);
    expect(processingTickets).not.toBeEmptyDOMElement();
  });
  it("can move ticket", async () => {
    const { container } = render(<WrappedComponent />);
    const processingTickets = container.querySelector('div[data-type="ticket-list"]:nth-child(1) > .col-items');
    const doneTickets = container.querySelector('div[data-type="ticket-list"]:nth-child(2) > .col-items');
    const closedTickets = container.querySelector('div[data-type="ticket-list"]:nth-child(3) > .col-items');

    expect(processingTickets).not.toBeEmptyDOMElement();
    expect(doneTickets).toBeEmptyDOMElement();
    expect(closedTickets).toBeEmptyDOMElement();

    const ticket = processingTickets.querySelector("div");
    expect(ticket).toBeInTheDocument();
    const done = ticket.querySelector("button");
    expect(done).toBeInTheDocument();
    fireEvent.click(done, { button: 1 });
    expect(processingTickets).toBeEmptyDOMElement();
    expect(doneTickets).not.toBeEmptyDOMElement();
    await sleep(5000);
    expect(processingTickets).toBeEmptyDOMElement();
    expect(doneTickets).toBeEmptyDOMElement();
    expect(closedTickets).not.toBeEmptyDOMElement();
  }, 6000);
});
