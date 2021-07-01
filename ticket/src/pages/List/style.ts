import { createUseStyles } from "react-jss";

export default createUseStyles({
  root: {
    padding: "12px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 24,
    flex: "1 1",
  },
  container: {
    display: "flex",
    flex: "1 1",
    marginRight: -12,
    marginLeft: -12,
  },

  box: {
    flex: "0 1 33%",
    textAlign: "center",
    borderRight: "1px solid #ccc",
    paddingRight: 12,
    paddingLeft: 12,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    "&:last-child": {
      borderRight: 0,
    },
    "& label": {
      fontWeight: 600,
      flexBasis: 50,
      lineHeight: "50px",
      borderBottom: "1px solid #ccc",
    },
  },
  "@media (max-width: 968px)": {
    container: {
      flexWrap: "wrap",
    },
    box: {
      flexBasis: "100%",
      borderRight: "0px solid #ccc",
      borderBottom: "1px solid #ccc",
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  action: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  item: {
    border: "1px dashed #ccc",
    padding: 12,
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 12,
    "& > span": {
      flexBasis: "100%",
      cursor: "pointer",
      "&:hover": {
        color: "#383736",
        backgroundColor: "#e9f5ec",
      },
    },
    "& > button": {
      padding: "8px 12px",
      fontSize: "smaller",
      flexBasis: "48%",
    },
    "& > button:last-child": {
      backgroundColor: "darkred",
      "&:hover": {
        backgroundColor: "#e60000",
      },
    },
  },
});
