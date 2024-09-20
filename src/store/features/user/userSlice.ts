import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  img: string;
  name: string;
}

const initialState: User = {
  id: 0,
  img: '',
  name: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      action.payload = state;
      return action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
