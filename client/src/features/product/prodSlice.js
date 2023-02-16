import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProduct = createAsyncThunk(
  'product/fetchproduct',
  async (id) => {
    const response = await axios.get(`/getproductsone/${id}`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'productx',
  initialState: {
    product: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder=>{
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    })
    builder.addCase(fetchProduct.rejected,(state, action) => {
      state.loading = false;
      state.error = action.error;
    })
  },
});

export default productSlice.reducer;
