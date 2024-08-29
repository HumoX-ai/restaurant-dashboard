import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Users {
  _id: string;
  name: string;
  username: string;
  password?: string;
  role: "restaurant_owner" | "customer";
  address: string;
  phone: string;
  createdAt: string;
}

interface UsersState {
  list: Users[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk<Users[], string>(
  "users/fetchUsers",
  async (query: string) => {
    const response = await axios.get<{ data: Users[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users?${query}`
    );

    return response.data.data;
  }
);

export const addUsers = createAsyncThunk<Users, Omit<Users, "_id">>(
  "users/addUsers",
  async (userData) => {
    const response = await axios.post<{ data: Users }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      userData
    );
    return response.data.data;
  }
);

export const updateUsers = createAsyncThunk<Users, Partial<Users>>(
  "restaurants/updateRestaurant",
  async (userData) => {
    const response = await axios.patch<{ data: Users }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userData._id}`,
      userData
    );
    return response.data.data;
  }
);

export const deleteUsers = createAsyncThunk<string, string>(
  "users/deleteUsers",
  async (id) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);
    return id;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<Users[]>) => {
          state.status = "succeeded";
          state.list = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addUsers.fulfilled, (state, action: PayloadAction<Users>) => {
        state.list.push(action.payload);
      })
      .addCase(updateUsers.fulfilled, (state, action: PayloadAction<Users>) => {
        const index = state.list.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(
        deleteUsers.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter((user) => user._id !== action.payload);
        }
      );
  },
});

export default usersSlice.reducer;
