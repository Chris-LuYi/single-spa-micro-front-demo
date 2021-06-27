import { createUseStyles } from "react-jss";

export default createUseStyles({
  root: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "3px",
    minHeight: "7em",
    padding: "1em",
    margin: "0.5em",
    fontWeight: "normal",
    display: "flex",
    flexDirection: "column",
    gap: 12,

    "& h2": {
      fontWeight: 600,
    },
  },

  action: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
    "& > button:last-child::after": {
      content: '"Back"',
    },
  },
  "@media (max-width: 968px)": {
    action: {
      "& > button:last-child": {
        position: "absolute",
        top: 0,
        left: 0,
        minHeight: "50px",
        minWidth: "auto",
        background: "transparent",
        color: "inherit",
        "&::after": {
          content: '"<<"',
        },
      },
    },
  },
});
