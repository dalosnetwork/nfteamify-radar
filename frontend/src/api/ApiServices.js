import axios from "axios";

/* const BASE_URL = process.env.REACT_APP_API_KEY; */
/* const TEST_USER = process.env.REACT_APP_TEST_USER; */
/* const TEST_USER = "gAAAAABmsy7iW3eDSt9SsRN2xgERo40J3lsfRgVADFysexVp06QpJHgJ1wqfu2MY2o_mvhVbaOEpmHdGDmYeaDWLuXpCHLcb1w=="; */
/* const TEST_USER = sessionStorage.getItem("nfteamify"); */

const BASE_URL = "https://radarapi.nfteamify.com";

const urlParams = new URLSearchParams(window.location.search);
const TEST_USER = urlParams.get('user');


export const submitPromoCode = async (promoCode, userId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/promo_code?promo_code=${promoCode}&user_id=${TEST_USER}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to submit promo code:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error submitting promo code:", error);
    return null;
  }
};


export const getPackage = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_package`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to get package information:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting package information:', error);
    return null;
  }
};


export const buyPackage = async (packageType, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/buy_package`, {
      package_type: packageType,
      user_id: TEST_USER,
    });
    console.log(response)
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to buy package:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error buying package:", error);
    return null;
  }
};


export const sellPlayer = async (playerId, price, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/sell_player`, {
      player_id: playerId,
      price: price,
      user_id: TEST_USER,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to sell player:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error selling player:', error);
    return null;
  }
};


export const callbackFromSale = async (playerId) => {
  try {
    const response = await axios.post(`${BASE_URL}/callback_from_sale`, {
      player_id: playerId,
      user_id: TEST_USER,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to callback from sale:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error in callback from sale:', error);
    return null;
  }
};


export const buyFromMarket = async (playerId, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/buy_from_market`, {
      player_id: playerId,
      user_id: TEST_USER,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to buy from market:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error buying from market:', error);
    return null;
  }
};


export const updateFirstEleven = async (playerIdList, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/update_first_eleven`, {
      player_id_list: playerIdList,
      user_id: TEST_USER,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to update first eleven:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error updating first eleven:', error);
    return null;
  }
};


export const lockTeam = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/lock_team`, {
      user_id: TEST_USER,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to lock team:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error locking team:', error);
    return null;
  }
};


export const unlockTeam = async (userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/unlock_team`, {
      user_id: TEST_USER,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to unlock team:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error unlocking team:', error);
    return null;
  }
};


export const upgradePlayer = async (playerId, skill, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/upgrade_player`, {
      player_id: playerId,
      skill: skill,
      user_id: TEST_USER,
    },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to upgrade player:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error upgrading player:', error);
    return null;
  }
};


export const getAllDeck = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/get_all_deck?user_id=${TEST_USER}`);

    if (response.status === 200) {
      
      return response.data;
    } else {
      console.error('Failed to get all decks:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting all decks:', error);
    return null;
  }
};


export const getAllMarketPlayers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get_all_market_players`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to get all market players:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting all market players:', error);
    return null;
  }
};


export const getLineUp = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/line_up?user_id=${TEST_USER}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to get line-up:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting line-up:', error);
    return null;
  }
};


export const getLeague = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/league?user_id=${TEST_USER}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to get league information:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error getting league information:', error);
    return null;
  }
};


export const getUserDetail = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user_detail?user_id=${TEST_USER}`,);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to get user details:', response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Forbidden: ', error.response.data.detail.message);
      return { status: 403, message: "Forbidden" };
    } else {
      console.error('Error getting user details:', error);
      return null;
    }
  }
};


export const completeMission = async (missionId) => {
  
  console.log(missionId)
  try {
    const response = await axios.post(`${BASE_URL}/complete_mission`, {
      user_id: TEST_USER,
      mission_id: missionId,
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to complete mission:', response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Forbidden: ', error.response.data.detail);
      return { status: 403, message: "Forbidden" };
    } else {
      console.error('Error completing mission:', error);
      return null;
    }
  }
};


export const getUserBalance = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user_balance?user_id=${TEST_USER}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Failed to fetch user balance:', response.statusText);
      return null;
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      console.error('Access denied: ', error.response.data);
      return { status: 403, message: "Access Denied" };
    } else {
      console.error('Error fetching user balance:', error);
      return null;
    }
  }
};