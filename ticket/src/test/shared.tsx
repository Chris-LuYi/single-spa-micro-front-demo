import React from "react";
import { MemoryRouter as BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import defaultStore from "../store";

const globalTimeout = global.setTimeout;
export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise((resolve) => globalTimeout(resolve, timeout));
  });
};

export function mountTest(Component: React.ComponentType) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const { unmount } = render(<Component />);
      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });
}

export const ReduxWrapper = ({ initialEntries, initialIndex, store, children }: { initialEntries?: any; initialIndex?: any; store?: any; children: React.ReactNode }) => {
  return (
    <BrowserRouter initialEntries={initialEntries} initialIndex={initialIndex}>
      <Provider store={store || defaultStore}>{children}</Provider>
    </BrowserRouter>
  );
};
