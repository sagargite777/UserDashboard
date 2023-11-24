import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'https://reqres.in/api/users';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data);

    const usersWithStatus = Array.isArray(response.data.data)
      ? response.data.data.map((user) => ({
          ...user,
          status: user.id % 2 === 0 ? 'inactive' : 'active',
        }))
      : [];

    console.log(usersWithStatus);
    return usersWithStatus;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
});

export const toggleUserStatusAsync = createAsyncThunk(
  'user/toggleUserStatusAsync',
  async (user, { getState }) => {
    try {
      const { users } = getState().user; // Make sure to access the user slice
      const updatedUsers = users.map((u) =>
        u.id === user.id
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      );
      return { users: updatedUsers };
    } catch (error) {
      console.error('Error toggling user status:', error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], selectedUser: null },
  reducers: {
    toggleUserStatus: (state, action) => {
      const { payload } = action;
      state.users = state.users.map((u) =>
        u.id === payload.id
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      );
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(toggleUserStatusAsync.fulfilled, (state, action) => {
      state.users = action.payload.users;
    });
  },
});

export const { toggleUserStatus, selectUser } = userSlice.actions;

export default userSlice.reducer;
