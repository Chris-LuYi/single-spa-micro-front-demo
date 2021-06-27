import React from "react";
import { Ticket } from "../../../models/ticket";
import useStyles from "../style";
import Item from "./Item";
const Column = ({ name, items, ...restProps }) => {
  const classes = useStyles();

  return (
    <div data-type="ticket-list" className={classes.box}>
      <label>{name}</label>
      <div className="col-items">
        {items.map((o: Ticket) => {
          return <Item key={o.id} entity={o} {...restProps} />;
        })}
      </div>
    </div>
  );
};

export default Column;
