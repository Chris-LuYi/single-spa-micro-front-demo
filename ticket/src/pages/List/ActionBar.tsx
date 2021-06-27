import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import useTicket from "../../hooks/useTicket";
import useStyles from "./style";

export default ({ status }: { status: string }) => {
  const classes = useStyles();
  const ref = useRef<HTMLInputElement>();
  const { addTicket } = useTicket();

  const isProcessing = status === "processing";

  return (
    <div className={classes.action}>
      <input
        data-id="add-input"
        type="text"
        ref={ref}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            addTicket(ref)();
          }
        }}
      />
      <button data-id="add-button" disabled={isProcessing} onClick={addTicket(ref)}>
        {isProcessing ? "..." : "Add"}
      </button>
    </div>
  );
};
