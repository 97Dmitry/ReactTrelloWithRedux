import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import usernameSlice from "./userSlice";
import columnSlice from "./columnSlice";

const middleware = getDefaultMiddleware({
  serializableCheck: true,
  immutableCheck: true,
  thunk: true,
});

const store = configureStore({
  reducer: { usernameState: usernameSlice, columnState: columnSlice },
  middleware,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
