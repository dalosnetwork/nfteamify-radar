import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllMarketPlayers } from "../../../api/ApiServices";

const initialState = {
  market: [],
};

export const getMarketData = createAsyncThunk('getMarketData', async() => {
  try {
    const result = await getAllMarketPlayers();
    return result
  } catch (error) {
      console.log(error)
  }
})

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketData.fulfilled, (state, action)=>{
        state.market = action.payload
    })
    .addCase(getMarketData.rejected, (state, action) => {
      state.market = null; // Clear the market state on rejection
    });
  }
})


export default marketSlice.reducer;
