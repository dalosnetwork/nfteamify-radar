import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDeck } from "../../../api/ApiServices";

const initialState = {
  deck: [],
};

export const getDeckData = createAsyncThunk('getDeckData', async() => {
  try {
    const result = await getAllDeck();
    return result
  } catch (error) {
      console.log(error)
  }
})

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
  },  
  extraReducers: (builder) => {
    builder.addCase(getDeckData.fulfilled, (state, action)=>{
        state.deck = action.payload
    })
    .addCase(getDeckData.rejected, (state, action) => {
      state.deck = null; 
    });
  }
})

export default deckSlice.reducer;
