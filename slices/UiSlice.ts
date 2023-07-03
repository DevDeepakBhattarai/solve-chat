import { createSlice } from "@reduxjs/toolkit";
type InitialState = {
  darkMode: boolean;
};
const initialState: InitialState = {
  darkMode: false,
};

const UiSlice = createSlice({
  name: "UI",
  initialState: initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
export default UiSlice.reducer;
export const { setDarkMode } = UiSlice.actions;
