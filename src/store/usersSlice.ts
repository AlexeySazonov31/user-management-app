import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {NewOrUpdateUser, User} from '../models/User';

const API_URL = 'https://manageuser-back.sasdev.space';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({page = 1, pageSize = 10}: {page?: number; pageSize?: number}) => {
    const response = await axios.get(
      `${API_URL}/users?page=${page}&pageSize=${pageSize}`,
    );
    return response.data;
  },
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: string) => {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  },
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user: NewOrUpdateUser) => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({id, ...user}: {id: string} & NewOrUpdateUser) => {
    const response = await axios.patch(`${API_URL}/users/${id}`, user);
    return response.data;
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: string) => {
    await axios.delete(`${API_URL}/users/${userId}`);
    return userId;
  },
);

const handlePending = (state: any) => {
  state.loading = true;
};

const handleFulfilled = (state: any, _action: any) => {
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
    page: 1,
    pageSize: 10,
    totalPages: 0,
    totalUsers: 0,
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => handlePending(state))
      .addCase(fetchUsers.fulfilled, (state, action) => {
        handleFulfilled(state, action);
        state.users = [...state.users, ...action.payload.results];
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.totalUsers = action.payload.total_users;
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
        handleRejected(state, action),
      )

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

export const {setPage, setPageSize} = usersSlice.actions;
export default usersSlice.reducer;
