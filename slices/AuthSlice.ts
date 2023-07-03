import { createSlice } from "@reduxjs/toolkit";
type InitialState = {
  activeTab: "signin" | "signup";
};
const initialState: InitialState = {
  activeTab: "signin",
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
export default AuthSlice.reducer;
export const { setActiveTab } = AuthSlice.actions;
