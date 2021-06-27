import React, { useRef } from "react";
import { withRouter } from "react-router";
import { useLocation } from "react-router-dom";
import useStyles from "./style";
import useTicket from "../../hooks/useTicket";

//@ts-ignore
const Detail = ({ desc, handleMoveTicket, history }: { desc: string; handleMoveTicket: () => void }) => {
  const location = useLocation();
  const id = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
  const classes = useStyles();
  const {
    state: { entities },
    changeTicketStatus,
  } = useTicket();
  const ref = useRef<HTMLTextAreaElement>();
  const current = entities[id];
  if (!current) throw Error("Invalid request: " + id);
  const fieldCheckWrapper = (status) => () => {
    if (ref.current?.value) {
      changeTicketStatus(id, status, ref.current.value)();
      history.push("/");
    } else {
      ref.current.focus();
      ref.current.classList.add("error");
    }
  };
  return (
    <div className={classes.root}>
      <p>{current.text}</p>
      <ul>
        {current.comments.map((o) => (
          <li>
            <h2>{new Date(o.date).toString()}</h2>
            {o.content}
          </li>
        ))}
      </ul>
      <div style={{ flex: "1 1" }}>
        <textarea
          ref={ref}
          placeholder="Add your comment here"
          style={{ minHeight: "200px" }}
          onChange={(e) => {
            if (e.target.value.length > 0) {
              e.target.classList.remove("error");
            }
          }}
        />
      </div>

      <div className={classes.action}>
        <button onClick={fieldCheckWrapper("done")}>Done</button>
        <button onClick={fieldCheckWrapper("in-progress")}>Not Fix</button>
        <button onClick={fieldCheckWrapper("closed")}>Close</button>
        <button
          onClick={() => {
            history.push("/");
          }}
        ></button>
      </div>
    </div>
  );
};

export default withRouter(Detail);
