import {configureStore} from "@reduxjs/toolkit";
import {SignUpReducer} from "./user";

const GlobalStore = configureStore({
  reducer: {
    signUp: SignUpReducer,
  },
});

export type GlobalStoreType = ReturnType<typeof GlobalStore.getState>;
export type GlobalStoreDispatchType = typeof GlobalStore.dispatch;

export default GlobalStore;
