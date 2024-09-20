import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Bot {
  id: number;
  img: string;
  name: string;
}

const initialState: Bot = {
  id: 0,
  img: '',
  name: '',
};

const botSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addActiveBot: (state, action: PayloadAction<Bot>) => {
      action.payload = state;
      return action.payload;
    },
  },
});

export const { addActiveBot } = botSlice.actions;
export default botSlice.reducer;
