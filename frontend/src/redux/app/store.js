import { configureStore } from "@reduxjs/toolkit";
import packageReducer  from "../features/packagedata/packageSlice";
import deckReducer  from "../features/deckdata/deckSlice";
import marketReducer  from "../features/marketdata/marketSlice";
import leagueReducer  from "../features/leaguedata/leagueSlice";
import lineupReducer  from "../features/lineupdata/lineupSlice";
import userReducer  from "../features/userdata/userSlice";

export const store = configureStore({
  reducer: {
    packages: packageReducer,
    deck: deckReducer,
    market: marketReducer,
    league: leagueReducer,
    lineup: lineupReducer,
    user: userReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;