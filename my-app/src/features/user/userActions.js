import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://reqres.in/api/users';

// Action creators
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await axios.get(apiUrl);
  const usersWithStatus = response.data.data.map((user) => ({
    ...user,
    status: user.id % 2 === 0 ? 'inactive' : 'active',
  }));
  return usersWithStatus;
});

export const toggleUserStatus = createAsyncThunk(
  'user/toggleUserStatus',
  async (userId, { getState }) => {
    const { users } = getState();
    const updatedUsers = users.map((user) =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    );
    return updatedUsers;
  }
);

// Initial state and reducers can still be included here
const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], selectedUser: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default userSlice.reducer;