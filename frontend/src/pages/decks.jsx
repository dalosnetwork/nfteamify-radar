import "../design/App.css";
import React, { useEffect, useState } from "react";
import tokenimg from "../design/assets/token.png";
import MobilePage from "../modals/mobile";
import buyutec from "../design/assets/buyutec.svg";
import ModalTrain from "../modals/modalTrain.jsx";
import ModalSell from "../modals/modalSell.jsx";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux.js";
import { useNavigate } from "react-router";
import { buyPackage, callbackFromSale } from "../api/ApiServices";
import ModalWallet from "../modals/modalWallet.jsx";
import walletimg from "../design/assets/wallet.svg"

const Decks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isSellOpen, setSellOpen] = useState(false);
  const [data, setData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const { deck } = useSelector((state) => state.deck);
  const { user } = useSelector((state) => state.user);

  console.log(deck)

  useEffect(() => {
    // Fetch data only if deck or user is empty
    if ((!deck || deck.length === 0) || (!user || user.length === 0)) {
      dispatch(fetchAllRedux());
    }
  }, [deck, user, dispatch]);

  const openModal = (player, pos, price) => {
    setData({ player, pos, price });
    setModalOpen(true);
  };

  const openSell = (player) => {
    setData({ player });
    setSellOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const closeSell = () => {
    setSellOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers = deck?.data?.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCallbackFromSale = async (player) => {
    try {
      const data = await callbackFromSale(player.player_id);
      if (data) {
        dispatch(fetchAllRedux());
      } else {
      }
    } catch (error) {
    }
  };
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);

  const openWalletModal = () => {
     setWalletModalOpen(true);
   };
 
   const closeWalletModal = () => {
     setWalletModalOpen(false);
   };

  return (
    <>
      <ModalWallet show={isWalletModalOpen} onClose={closeWalletModal} />
      <ModalTrain show={isModalOpen} onClose={closeModal} data={data} />
      <ModalSell show={isSellOpen} onClose={closeSell} data={data} />
      <MobilePage data={true}>
        <div id="decks">
          <h1 className="header">
            <div className="row d-flex justify-content-between">
              <div className="col-2 my-auto">
                <h1 className="title m-0">DECKS</h1>
              </div>
              <div className="col-2 d-flex" style={{ flexDirection: "row-reverse" }}>
                <img onClick={()=>openWalletModal()} className="ms-2" src={walletimg} alt="" />
                <div className="budgetWrapper">
                  <img className="token" src={tokenimg} alt="" />
                  <span className="budget">
                    {/* {user?.data?.user?.balance !== undefined ? user.data.user.balance : 'Loading...'} */}
                    {sessionStorage.getItem("balance")}
                  </span>
                </div>
              </div>
            </div>
          </h1>
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-12 text-center">
                <div className="input-container">
                  <span className="icon">
                    <img src={buyutec} alt="" />
                  </span>
                  <input
                    className="input"
                    type="text"
                    placeholder="Search player"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="playersWrapper scroll">
                  <div className="accordion" id="accordionExample">
                    {filteredPlayers.length > 0 ? (
                      filteredPlayers.map((player, index) => (
                        <div className="accordion-item mb-4" key={index}>
                          <h2 className="accordion-header" id={`heading${index}`}>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                              <div className="d-flex playerTop">
                                <div className="my-auto index">{player.number}</div>
                                <div className="my-auto name">{player.name}</div>
                                <div className="my-auto position">{player.position}</div>
                                <div className="my-auto rating">{player.Overall}</div>
                              </div>
                            </button>
                          </h2>
                          <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${index}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <div className="playerBottom">
                                <div className="row">
                                  <div className="col-2">
                                    <div className="col-12">NAT</div>
                                    <div className="col-12">
                                    <img src={`https://flagcdn.com/w20/${player.race}.png`} alt="Flag" />
                                    </div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12">AGE</div>
                                    <div className="col-12">{player.age}</div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12">FRW</div>
                                    <div className="col-12">{player.FRW}</div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12">MD</div>
                                    <div className="col-12">{player.MD}</div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12">DEF</div>
                                    <div className="col-12">{player.DEF}</div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12">GK</div>
                                    <div className="col-12">{player.GK}</div>
                                  </div>
                                </div>
                                <div className="row mt-2">
                                  <div className="col-4">
                                    <div className="col-12 d-flex justify-content-center">
                                      {player.is_sale ?
                                        (<>
                                          <button
                                            onClick={() => handleCallbackFromSale(player)}
                                            className="button sell"
                                          >
                                            <i className="fa-solid fa-cart-shopping m-auto me-2"></i> CANCEL
                                          </button>
                                        
                                        </>):(<>
                                          <button
                                            onClick={() => openSell(player)}
                                            className="button sell"
                                          >
                                            <i className="fa-solid fa-cart-shopping m-auto me-2"></i> SELL
                                          </button>
                                        
                                        </>)
                                      }
                                    </div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12 d-flex justify-content-center">
                                      <button
                                        onClick={() => openModal(player, 'FRW', player.prices.FRW)}
                                        className="button"
                                      >
                                        <i className="fa-solid fa-arrow-up"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12 d-flex justify-content-center">
                                      <button
                                        onClick={() => openModal(player, 'MD', player.prices.MD)}
                                        className="button"
                                      >
                                        <i className="fa-solid fa-arrow-up"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12 d-flex justify-content-center">
                                      <button
                                        onClick={() => openModal(player, 'DEF', player.prices.DEF)}
                                        className="button"
                                      >
                                        <i className="fa-solid fa-arrow-up"></i>
                                      </button>
                                    </div>
                                  </div>
                                  <div className="col-2">
                                    <div className="col-12 d-flex justify-content-center">
                                      <button
                                        onClick={() => openModal(player.player_id, 'GK', player.prices.GK)}
                                        className="button"
                                      >
                                        <i className="fa-solid fa-arrow-up"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No players found</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MobilePage>
    </>
  );
};

export default Decks;
