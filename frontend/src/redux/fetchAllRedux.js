import { getPackageData } from './features/packagedata/packageSlice';
import { getDeckData } from './features/deckdata/deckSlice';
import { getMarketData } from './features/marketdata/marketSlice';
import { getLeagueData } from './features/leaguedata/leagueSlice';
import { getLineupData } from './features/lineupdata/lineupSlice';
import { getUserData } from './features/userdata/userSlice';

export const fetchAllRedux = () => {
    return dispatch => {
        dispatch(getPackageData())
        dispatch(getDeckData())
        dispatch(getMarketData())
        dispatch(getLeagueData())
        dispatch(getLineupData())
        dispatch(getUserData())
    }
}

export default fetchAllRedux

