import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  
  name: "theme",
  initialState: { isDark: false, isPremium: false },
  reducers: {
    togglePremium(state) {
      state.isPremium = !state.isPremium;
      if (!state.isPremium) {
        state.isDark = false; // reset theme when premium is turned off
      }
    },
    toggleTheme(state) {
      state.isDark = !state.isDark;
    },
    activatePremium(state) {
      state.isPremium = true;  
    },
    deactivatePremium(state) {
      state.isPremium = false;
    },
  },
});

export const { togglePremium, toggleTheme,activatePremium, deactivatePremium } = themeSlice.actions;
export default themeSlice.reducer;