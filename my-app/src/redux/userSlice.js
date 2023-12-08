import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [], // Initialize the list with an empty array
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    toggleUserStatus: (state, action) => {
      const userId = action.payload;
      state.list = state.list.map((user) =>
        user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
      );
    },
  },
});

export const { selectUser, toggleUserStatus } = usersSlice.actions;

export default usersSlice.reducer;
