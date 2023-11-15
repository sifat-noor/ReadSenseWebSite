import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from "./store";

export interface SessionState {
  accessToken: string | null;
}

const initialState: SessionState = {
  accessToken: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken } = sessionSlice.actions;

export const accessToken = (state: AppState) => state.session.accessToken;

export default sessionSlice.reducer;