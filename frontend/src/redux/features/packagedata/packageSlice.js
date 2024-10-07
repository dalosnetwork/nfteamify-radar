import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPackage } from "../../../api/ApiServices";

const initialState = {
  packages: [],
};

export const getPackageData = createAsyncThunk('getPackageData', async() => {
  try {
    const result = await getPackage();
    return result
  } catch (error) {
      console.log(error)
  }
})

export const packageSlice = createSlice({
  name: "packages",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getPackageData.fulfilled, (state, action)=>{
        state.packages = action.payload
    })
    .addCase(getPackageData.rejected, (state, action) => {
      state.packages = null;
    });
  }
})


export default packageSlice.reducer;
