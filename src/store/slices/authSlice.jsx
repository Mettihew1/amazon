import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Purely in-memory now
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; // Just store user data in Redux
    },
    signOut: (state) => {
      state.user = null;
    }
  }
});

export const { loginSuccess, signOut } = authSlice.actions;
export default authSlice.reducer;