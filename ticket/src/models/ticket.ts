import { createSlice, createSelector, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

export type TicketStatus = "in-progress" | "done" | "closed";
export type TicketComment = {
  id: number;
  date: number;
  content: string;
};
export type Ticket = {
  id: number;
  text: string;
  status: TicketStatus;
  comments: TicketComment[];
};

const ticketAdapter = createEntityAdapter<Ticket>();

const initialState = ticketAdapter.getInitialState({
  status: "idle",
});
let uid = 0;
export const addTicket = createAsyncThunk("ticket/addNewTicket", async (payload: string) => {
  return new Promise((resolve, reject) => {
    if (!payload) {
      reject("Value cannot be empty");
    }
    setTimeout(() => {
      resolve({
        //@ts-ignore
        id: uid++,
        text: payload,
        status: "in-progress",
        comments: [],
      });
    }, 1500);
  });
});
export const counterSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    changeStatus: (state, { payload }) => {
      const { newComment, id, newStatus } = payload;
      const current = state.entities[id];
      ticketAdapter.setOne(state, {
        ...current,
        comments: newComment
          ? current.comments.concat([
              {
                date: new Date().getTime(),
                id: uid++,
                content: newComment,
              },
            ])
          : current.comments,
        status: newStatus,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTicket.pending, (state, action) => {
        state.status = "processing";
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.status = "idle";
        //@ts-ignore
        ticketAdapter.addOne(state, action);
      });
  },
});

export default counterSlice.reducer;
