import React, { useEffect } from "react";
import { withRouter } from "react-router";
import useStyles from "../style";
import type { Ticket } from "../../../models/ticket";
import useTicket from "../../../hooks/useTicket";

//@ts-ignore
const Item = ({ entity, actionRender = (t: Ticket) => null, history }: { entity: Ticket; actionRender?: (t: Ticket) => React.ReactNode }) => {
  const classes = useStyles();
  const { changeTicketStatus } = useTicket();
  useEffect(() => {
    let autoCloseTimeout;
    if (entity.status === "done") {
      autoCloseTimeout = setTimeout(() => {
        changeTicketStatus(entity.id, "closed")();
      }, 5000);
    }
    return () => {
      clearTimeout(autoCloseTimeout);
    };
  }, []);
  return (
    <div className={classes.item}>
      <span
        onClick={() => {
          history.push("/ticket/" + entity.id);
        }}
      >
        {entity.text}
      </span>
      {actionRender(entity)}
    </div>
  );
};

export default withRouter(Item);
