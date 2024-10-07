import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLeague } from "../../../api/ApiServices";

const initialState = {
  league: [],
};

export const getLeagueData = createAsyncThunk('getLeagueData', async() => {
  try {
    const result = await getLeague();
   
    return result
  } catch (error) {
      console.log(error)
  }
})

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getLeagueData.fulfilled, (state, action)=>{
        state.league = action.payload
    })
    .addCase(getLeagueData.rejected, (state, action) => {
      state.league = null; 
    });
  }
})


export default leagueSlice.reducer;
