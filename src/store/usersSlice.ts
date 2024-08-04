import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { NewOrUpdateUser, User } from '../models/User';
import Config from 'react-native-config';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(`${Config.API_URL}/users`);
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string) => {
    const response = await axios.get(`${Config.API_URL}/users/${userId}`);
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: NewOrUpdateUser) => {
    console.log(user);
    const response = await axios.post(`${Config.API_URL}/users`, user);
    return response.data;
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, ...user }: { id: string } & NewOrUpdateUser) => {
    const response = await axios.patch(`${Config.API_URL}/users/${id}`, user);
    return response.data;
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string) => {
    await axios.delete(`${Config.API_URL}/users/${userId}`);
    return userId;
  },
);

// helpers
const handlePending = (state: any) => {
  state.loading = true;
};

const handleFulfilled = (state: any, action: any) => {
  state.loading = false;
  state.error = null;
};

const handleRejected = (state: any, action: any) => {
  state.loading = false;
  state.error = action.error.message || 'An error occurred';
};

// slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
    user: null as User | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => handlePending(state))
      .addCase(fetchUsers.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) =>
        handleRejected(state, action),
      )

      .addCase(fetchUserById.pending, state => handlePending(state))
      .addCase(fetchUserById.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.user = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) =>
        handleRejected(state, action))

      .addCase(deleteUser.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        const index = state.users.findIndex(
          user => user.id === action.payload.id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default usersSlice.reducer;
