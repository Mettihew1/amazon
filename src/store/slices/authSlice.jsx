import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    signOut: (state) => {
      state.user = null;
    },
    // Add other auth actions as needed
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;