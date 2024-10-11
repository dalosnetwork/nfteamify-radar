import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Card from "../modals/card";
import fetchAllRedux from "../redux/fetchAllRedux";
import ModalCard from "../modals/modalCard";
import ModalBuy from "../modals/modalBuy";
import tokenimg from "../design/assets/token.png";
import solimg from "../design/assets/sol.png";
import bronze from "../design/assets/bronze.png";
import silver from "../design/assets/silver.png";
import gold from "../design/assets/gold.png";
import buyutec from "../design/assets/buyutec.svg";
import filtre from "../design/assets/filtre.svg";
import card from "../design/assets/card.png";
import { buyPackage, callbackFromSale } from "../api/ApiServices";
import MobilePage from "../modals/mobile";
import ModalBuyRadar from "../modals/modalBuyRadar";
import Wallet from "../modals/wallet";
import ModalWallet from "../modals/modalWallet.jsx";
import walletimg from "../design/assets/wallet.svg"
import coinimg from "../design/assets/coin.svg"


const Shop = () => {
  const dispatch = useDispatch();

  const [isMarket, setIsMarket] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBuyOpen, setBuyOpen] = useState(false);
  const [isBuyRadarOpen, setBuyRadarOpen] = useState(false);
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});


  const [tempBalance, setTempBalance] = useState(6600);
  const [tempSol, setTempSol] = useState(12);

  const { packages } = useSelector((state) => state.packages);
  const { market } = useSelector((state) => state.market);
  const { user } = useSelector((state) => state.user);
  const { deck } = useSelector((state) => state.deck);



  useEffect(() => {
    if (user && user.length === 0) {
      dispatch(fetchAllRedux());
    }
  }, [user, dispatch]);

  const openModal = (txt, btn1, btn2, player) => {
    const newData = {
      text: txt,
      image: card,
      btn1: btn1,
      btn2: btn2,
      player: player,
    };
    setData(newData);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openBuy = (player) => {
    const newData = {
      text: "1",
      image: card,
      btn1: "btn1",
      btn2: "btn2",
      player: player,
    };
    setData1(newData);
    setBuyOpen(true);
  };

  const closeBuy = () => {
    setBuyOpen(false);
  };

  const openBuyRadar = (player) => {
    const newData = {
      text: "1",
      image: card,
      btn1: "btn1",
      btn2: "btn2",
      player: player,
    };
    setData1(newData);
    setBuyRadarOpen(true);
  };

  const closeBuyRadar = () => {
    setBuyRadarOpen(false);
  };

  const handleBuyPackage = async (p, price) => {
    try {
      const response = await buyPackage(p);
      if (response) {
        openModal("Card added to the team!", "Team", "Back", response);
        dispatch(fetchAllRedux());
        console.log("Package purchased successfully");
      } else {
        console.log("Failed to purchase package");
      }
    } catch (error) {
      console.error("Error purchasing package:", error);
    }
    setTempBalance(tempBalance-price)
  };

  const getImageSource = (pack) => {
    switch (pack.package) {
      case "BRONZE":
        return bronze;
      case "SILVER":
        return silver;
      case "GOLD":
        return gold;
      default:
        return ""; // Return an empty string if none of the conditions match
    }
  };

  // Safely create a set of player_ids in your deck for fast lookup
  const deckPlayerIds =
    deck && deck.data
      ? new Set(deck.data.map((player) => player.player_id))
      : new Set();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers =
    market?.data?.filter((player) =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleCallbackFromSale = async (player) => {
    try {
      const data = await callbackFromSale(player.player_id);
      if (data) {
        dispatch(fetchAllRedux());
      } else {
        console.log("Failed to callback player from sale");
      }
    } catch (error) {
      console.error("Error in callback from sale:", error);
    }
  };

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  
  const openWalletModal = () => {
     setWalletModalOpen(true);
   };
  
  const closeWalletModal = () => {
    setWalletModalOpen(false);
  };

  const [balance, setBalance] = useState(
    parseFloat(sessionStorage.getItem("balance")) || 0
  );
  const [sol, setSol] = useState(parseFloat(sessionStorage.getItem("sol")) || 0);

  useEffect(() => {
    // Sync the state with sessionStorage when component mounts
    const storedBalance = parseFloat(sessionStorage.getItem("balance"));
    const storedSol = parseFloat(sessionStorage.getItem("sol"));

    if (storedBalance) setBalance(storedBalance);
    if (storedSol) setSol(storedSol);
  }, []);

  const buyForRadar = async () => {
    const newSol = sol - 0.1;
    const newBalance = balance + 1000;

    sessionStorage.setItem("sol", newSol);
    sessionStorage.setItem("balance", newBalance);

    setSol(newSol);
    setBalance(newBalance); // Update state to trigger re-render
  };

  const sellForRadar = async (x) => {
    const newBalance = balance - x;

    sessionStorage.setItem("balance", newBalance);
    setBalance(newBalance); // Update state to trigger re-render
  };

  return (
    <>
      <ModalWallet show={isWalletModalOpen} onClose={closeWalletModal}/>
      <ModalCard show={isModalOpen} onClose={closeModal} data={data} />
      <ModalBuyRadar show={isBuyRadarOpen} onClose={closeBuyRadar} />
      <ModalBuy show={isBuyOpen} onClose={closeBuy} data={data1} />
      <MobilePage>
        <div id="shop">
          <h1 className="header">
            <div className="row d-flex justify-content-between">
              <div className="col-2 my-auto">
                <h1 className="title m-0">MARKET</h1>
              </div>
              <div
                className="col-2 d-flex"
                style={{ flexDirection: "row-reverse" }}
                >
                <img onClick={()=>openWalletModal()} className="ms-2" src={walletimg} alt="" />
                <div className="budgetWrapper">
                  <img className="token" src={tokenimg} alt="" />
                  <span className="budget">
                    {/* {user?.data?.user?.balance !== undefined
                      ? user.data.user.balance
                      : "Loading..."} */}
                      {tempBalance}
                  </span>
                </div>
              </div>
            </div>
          </h1>
          <div className="container">
            <div className="row">
              <div
                className="col-12 d-flex justify-content-between"
                style={{ padding: "0 20px", margin: "10px auto" }}
              >
                <div className="col pe-1 d-flex justify-content-center">
                  <button
                    className={`button ${!isMarket ? "active" : ""}`}
                    onClick={() => setIsMarket(false)}
                  >
                    Decks
                  </button>
                </div>
                <div className="col ps-1 d-flex justify-content-center">
                  <button
                    className={`button ${isMarket ? "active" : ""}`}
                    onClick={() => setIsMarket(true)}
                  >
                    Market
                  </button>
                </div>
              </div>
              {!isMarket ? (
                <>
                  <div className="col-12 pt-2 p-0 scroll">
                    <div className="packWrapper">
                      <div
                        className="row packCard"
                      >
                        <div className="col m-auto p-0 d-flex justify-content-center">
                          <img
                            className="img img-fluid"
                            src={coinimg}
                            alt=""
                            style={{boxShadow:"none"}}
                          />
                        </div>
                        <div className="col">
                          <div className="col-12">
                            <span className="title">BUY POINT
                            </span>
                          </div>
                          <div className="col-12">
                            <span className="description">
                              Buy +1000 point for 0.1 SOL
                            </span>
                          </div>
                          <div className="col-12 d-flex justify-content-end mt-3">
                            <span className="price my-auto">
                              0.1 <img src={solimg} alt="" />
                            </span>
                            <button className="buy" onClick={()=>setTempBalance(tempBalance+1000)}>
                              BUY
                            </button>
                          </div>
                        </div>
                      </div>
                      {packages.data &&
                        packages.data.map((pack, index) => (
                          <div
                            key={index}
                            className="row packCard"
                            style={{ color: pack.color }}
                          >
                            <div className="col m-auto p-0 d-flex justify-content-center">
                              <img
                                className="img img-fluid"
                                src={getImageSource(pack)}
                                alt=""
                              />
                            </div>
                            <div className="col">
                              <div className="col-12">
                                <span className="title">{pack.package}</span>
                              </div>
                              <div className="col-12">
                                <span className="description">
                                  {pack.description}
                                </span>
                              </div>
                              <div className="col-12 d-flex justify-content-end mt-3">
                                <span className="price my-auto">
                                  {pack.price} <img src={tokenimg} alt="" />
                                </span>
                                <button
                                  onClick={() => handleBuyPackage(pack.package, pack.price)}
                                  className="buy"
                                  style={{ borderColor: pack.color }}
                                >
                                  BUY
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                          
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="inputWrapper">
                    <div className="row d-flex justify-content-center p-20">
                      <div className="col-12 p-0 d-flex justify-content-between">
                        <div className="input-container">
                          <input
                            className="input"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search"
                          />
                          <span className="icon">
                            <img src={buyutec} alt="" />
                          </span>
                        </div>
                        <button className="filter">
                          <img src={filtre} alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 pt-2 p-0 scroll">
                    <div className="marketWrapper">
                      <div className="row p-0">
                        {market.data &&
                          filteredPlayers.map((player, index) => (
                            <div className="col-6 p-3" key={index}>
                              <div className="cardWrapper text-center">
                                <div className="row">
                                  <div className="col-12 d-flex justify-content-center">
                                    <Card data={player} />
                                  </div>
                                  <div className="col-12">
                                    <p className="price">
                                      {player.price}{" "}
                                      <img src={tokenimg} alt="" />
                                    </p>
                                    {deckPlayerIds.size > 0 &&
                                    deckPlayerIds.has(player.player_id) ? (
                                      <button
                                        className="buy"
                                        onClick={() =>
                                          handleCallbackFromSale(player)
                                        }
                                      >
                                        CALLBACK
                                      </button>
                                    ) : (
                                      <button
                                        className="buy"
                                        onClick={() => openBuy(player)}
                                      >
                                        BUY
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </MobilePage>
    </>
  );
};

export default Shop;
