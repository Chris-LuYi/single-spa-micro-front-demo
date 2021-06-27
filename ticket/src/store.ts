import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./models/ticket";

const rootReducer = combineReducers({
  ticket: ticketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});

export const getStore = (defaultState) => {
  return configureStore({ reducer: rootReducer, preloadedState: defaultState });
};
