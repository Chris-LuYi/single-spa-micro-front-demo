import React, { useCallback, useRef } from "react";
import Column from "./Column";
import ActionBar from "./ActionBar";
import useStyles from "./style";
import useTicket from "../../hooks/useTicket";

const List = (props) => {
  const classes = useStyles();
  const { changeTicketStatus, getMatchTickets, state } = useTicket();

  return (
    <div className={classes.root}>
      <ActionBar status={state.status} />
      <div className={classes.container}>
        <Column
          name="IN-PROGRESS"
          items={getMatchTickets("in-progress")}
          actionRender={(entity) => (
            <>
              <button onClick={changeTicketStatus(entity.id, "done")}>Done</button>
              <button onClick={changeTicketStatus(entity.id, "closed")}>Close</button>
            </>
          )}
        />
        <Column
          name="DONE"
          items={getMatchTickets("done")}
          actionRender={(entity) => (
            <>
              <button onClick={changeTicketStatus(entity.id, "in-progress")}>Not Fix</button>
              <button onClick={changeTicketStatus(entity.id, "closed")}>Close</button>
            </>
          )}
        />
        <Column name="CLOSE" items={getMatchTickets("closed")} />
      </div>
    </div>
  );
};
export default List;
