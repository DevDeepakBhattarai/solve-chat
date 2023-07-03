import AuthReducer from "@/slices/AuthSlice";
import UiReducer from "@/slices/UiSlice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    ui: UiReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
