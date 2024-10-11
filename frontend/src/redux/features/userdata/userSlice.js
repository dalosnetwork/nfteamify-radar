import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPackage, getUserDetail } from "../../../api/ApiServices";

const initialState = {
  user: [],
};

export const getUserData = createAsyncThunk('getUserData', async() => {
  try {
    const result = await getUserDetail();
    console.log(result)
    return result
  } catch (error) {
      console.log(error)
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action)=>{
        state.user = action.payload
    })
    .addCase(getUserData.rejected, (state, action) => {
      state.user = null;
    });
  }
})


export default userSlice.reducer;
