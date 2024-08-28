// src/store/restaurantsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Restaurant {
  _id: string;
  name: string;
  owner_id: string;
  location: string;
  description: string;
  open_hours: string;
}

interface RestaurantsState {
  list: Restaurant[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RestaurantsState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchRestaurants = createAsyncThunk<Restaurant[]>(
  "restaurants/fetchRestaurants",
  async () => {
    const response = await axios.get<{ data: Restaurant[] }>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`
    );
    return response.data.data;
  }
);

export const addRestaurant = createAsyncThunk<
  Restaurant,
  Omit<Restaurant, "_id">
>("restaurants/addRestaurant", async (restaurantData) => {
  const response = await axios.post<{ data: Restaurant }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants`,
    restaurantData
  );
  return response.data.data;
});

export const updateRestaurant = createAsyncThunk<
  Restaurant,
  Partial<Restaurant>
>("restaurants/updateRestaurant", async (restaurantData) => {
  const response = await axios.patch<{ data: Restaurant }>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${restaurantData._id}`,
    restaurantData
  );
  return response.data.data;
});

export const deleteRestaurant = createAsyncThunk<string, string>(
  "restaurants/deleteRestaurant",
  async (id) => {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants/${id}`
    );
    return id;
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRestaurants.fulfilled,
        (state, action: PayloadAction<Restaurant[]>) => {
          state.status = "succeeded";
          state.list = action.payload;
        }
      )
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(
        addRestaurant.fulfilled,
        (state, action: PayloadAction<Restaurant>) => {
          state.list.push(action.payload);
        }
      )
      .addCase(
        updateRestaurant.fulfilled,
        (state, action: PayloadAction<Restaurant>) => {
          const index = state.list.findIndex(
            (restaurant) => restaurant._id === action.payload._id
          );
          if (index !== -1) {
            state.list[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteRestaurant.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.list = state.list.filter(
            (restaurant) => restaurant._id !== action.payload
          );
        }
      );
  },
});

export default restaurantsSlice.reducer;
