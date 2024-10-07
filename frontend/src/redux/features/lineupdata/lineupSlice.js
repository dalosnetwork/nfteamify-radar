import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLineUp } from "../../../api/ApiServices";

const initialState = {
  lineup: [],
};

export const getLineupData = createAsyncThunk('getLineupData', async() => {
  try {
    const result = await getLineUp();
    return result
  } catch (error) {
      console.log(error)
  }
})

export const lineupSlice = createSlice({
  name: "lineup",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getLineupData.fulfilled, (state, action)=>{
        state.lineup = action.payload
    })
    .addCase(getLineupData.rejected, (state, action) => {
      state.lineup = null; // Clear the lineup state on rejection
    });
  }
})


export default lineupSlice.reducer;
