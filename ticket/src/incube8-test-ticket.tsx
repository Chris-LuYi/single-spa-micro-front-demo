import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center",
          lineHeight: "26px",
          color: "red",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
        }}
      >
        <h1>Something wrong here</h1>
        <div>{err?.message}</div>
        <div style={{ flex: "1 1" }}>{err?.stack}</div>

        <button
          style={{ maxWidth: "200px" }}
          onClick={() => {
            location.href = "/";
          }}
        >
          Back to Home
        </button>
      </div>
    );
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
