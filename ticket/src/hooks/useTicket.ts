import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTicket as addTicketToState, TicketStatus } from "../models/ticket";
import type { RootState } from "../store";

export default () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.ticket);
  const { entities, ids } = state;

  const addTicket = useCallback(
    (ref: React.MutableRefObject<HTMLInputElement>) => async () => {
      const {
        //@ts-ignore
        meta: { requestStatus },
      } = await dispatch(addTicketToState(ref.current.value));
      if (requestStatus === "fulfilled") {
        ref.current.value = "";
      }
    },
    []
  );

  const changeTicketStatus = useCallback(
    (id: number, newStatus: TicketStatus, newComment?: string) => () => {
      console.log({
        id,
        newStatus,
        newComment,
      });
      dispatch({
        type: `ticket/changeStatus`,
        payload: {
          id,
          newStatus,
          newComment,
        },
      });
    },
    []
  );

  const getMatchTickets = useCallback(
    (status: TicketStatus) => {
      return ids.filter((o) => entities[o].status === status).map((o) => entities[o]);
    },
    [entities, ids]
  );
  return {
    state,
    addTicket,
    changeTicketStatus,
    getMatchTickets,
  };
};
