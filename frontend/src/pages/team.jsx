import "../design/App.css";
import React, { useEffect, useRef, useState } from "react";
import tokenimg from "../design/assets/token.png";
import back from "../design/assets/back.png";
import MobilePage from "../modals/mobile.jsx";
import buyutec from "../design/assets/buyutec.svg";
import { useDispatch, useSelector } from "react-redux";
import { lockTeam, unlockTeam, updateFirstEleven } from "../api/ApiServices.js";
import fetchAllRedux from "../redux/fetchAllRedux.js";
import { useNavigate } from "react-router";
import ModalWallet from "../modals/modalWallet.jsx";
import walletimg from "../design/assets/wallet.svg"

const Team = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deck } = useSelector((state) => state.deck);
  const { lineup } = useSelector((state) => state.lineup);
  const { user } = useSelector((state) => state.user);

  const [isPicking, setIsPicking] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [firstEleven, setFirstEleven] = useState({});
  const [position, setPosition] = useState(0);
  const [selectPosition, setSelectPosition] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  


  useEffect(() => {
    if (lineup && lineup.data) {
      setFirstEleven(lineup.data.first_eleven);
    }
  }, [lineup]);

  useEffect(() => {
    // Fetch data only if deck or user is empty
    if ((!deck || deck.length === 0) || (!user || user.length === 0)) {
      dispatch(fetchAllRedux());
    }
  }, [deck, user, dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayers = deck?.data?.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) && player.position === selectPosition
  ) || [];

  function truncateName(fullName) {
    const parts = fullName.split(" ");
    const firstNameInitial = parts[0].charAt(0);
    const truncatedName = `${firstNameInitial}. ${parts.slice(1).join(" ")}`;
    return truncatedName;
  }

  const handleLockTeam = async () => {
    try {
      const data = await lockTeam();
      if (data) {
        console.log('Team locked successfully');
        setIsLocked(true);
      } else {
        console.log('Failed to lock team');
      }
    } catch (error) {
      console.error('Error locking team:', error);
    }
  };

  const handleUnlockTeam = async () => {
    try {
      const data = await unlockTeam();
      if (data) {
        console.log('Team unlocked successfully');
        setIsLocked(false);
      } else {
        console.log('Failed to unlock team');
      }
    } catch (error) {
      console.error('Error unlocking team:', error);
    }
  };

  const handleIsPicking = (pos, pos1) => {
    setSelectPosition(pos1)
    setPosition(pos);
    setIsPicking(true);
  };

  const handleAddEleven = async (playerId) => {
    handleUpdateFirstEleven(playerId);
  };

  const handleUpdateFirstEleven = async (playerId) => {
    const newArray = [];

    for (const key in firstEleven) {
      if (firstEleven.hasOwnProperty(key)) {
        const item = firstEleven[key];
        const currentPlayerId = item.data && item.data.player_id !== undefined ? item.data.player_id : 0;
        newArray.push(currentPlayerId);
      }
    }
    newArray[parseInt(position - 1)] = parseInt(playerId);

    console.log(newArray)
    
    const filledPlayers = Array.from({ length: 11 }, (_, index) => {
      return newArray[index] !== undefined ? newArray[index] : 0;
    });
    
    console.log(filledPlayers)
    try {
      const data = await updateFirstEleven(filledPlayers);
      if (data) {
        console.log('First eleven updated successfully');
        setIsPicking(false);
        dispatch(fetchAllRedux());
      } else {
        console.log('Failed to update first eleven');
      }
    } catch (error) {
      console.error('Error updating first eleven:', error);
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
      <MobilePage data={isPicking}>
        <div id="lineup">
          <h1 className="header">
            <div className="row d-flex justify-content-between">
                <div className="col-2 my-auto">
                  {!isPicking ? (
                    <>
                      <h1 className="title m-0">LINEUP</h1>
                    </>
                  ):(
                    <>
                      <img src={back} onClick={()=>setIsPicking(false)} className="back" alt="" />
                    </>
                  )}
                </div>
                <div className="col-2 d-flex" style={{flexDirection:"row-reverse"}}>
                  <img onClick={()=>openWalletModal()} className="ms-2" src={walletimg} alt="" />
                  <div className="budgetWrapper">
                    <img className="token" src={tokenimg} alt="" />
                    <span className="budget">{/* {user?.data?.user?.balance !== undefined ? user.data.user.balance : 'Loading...'} */}
                      6100
                    </span>
                  </div>
                </div>
              </div>
          </h1>
          <div className="container">
            <div className="row d-flex justify-content-center">
              {!isPicking ? (
                <div /* ref={scrollableDivRef} */ className="col-12 d-flex justify-content-center scroll">
                  <div className="pitchWrapper text-center">
                    <div className="pitch">
                      <div className="pitchInner d-flex justify-content-center">
                        {firstEleven &&
                          <div
                            className="row d-flex justify-content-center text-center"
                            style={{ height: "100%", width: "100%" }}
                          >
                            <div className="col-6 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 11 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(11, "FRW");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 11).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 11).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(11, "FRW"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-6 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 10 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(10, "FRW");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 10).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 10).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(10, "FRW"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 9 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(9, "MD");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 9).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 9).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(9, "MD"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 8 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(8, "MD");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 8).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 8).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(8, "MD"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 7 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(7, "MD");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 7).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 7).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(7, "MD"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 6 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(6, "MD");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 6).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 6).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(6, "MD"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 5 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(5, "DEF");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 5).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 5).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(5, "DEF"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 4 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(4, "DEF");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 4).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 4).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(4, "DEF"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 3 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(3, "DEF");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 3).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 3).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(3, "DEF"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-3 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 2 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(2, "DEF");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 2).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 2).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(2, "DEF"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                            <div className="col-12 m-auto">
                              {Object.values(firstEleven).find(player => player.position === 1 && player.data && Object.keys(player.data).length > 0) ? (
                                <div className="playerWrapper">
                                  <div
                                    className="pickedCircle"
                                    onClick={() => {
                                      handleIsPicking(1, "GK");
                                    }}
                                  >
                                    <div className="innerCircle"></div>
                                    <div className="number">
                                      {Object.values(firstEleven).find(player => player.position === 1).data.number}
                                    </div>
                                  </div>
                                  <div className="name">
                                    {truncateName(Object.values(firstEleven).find(player => player.position === 1).data.name)}
                                  </div>
                                </div>
                              ) : (
                                <div className="playerWrapper">
                                  <div
                                    className="circle"
                                    onClick={() => {
                                      handleIsPicking(1, "GK"); 
                                    }}
                                  ></div>
                                </div>
                              )}
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                    {/* { isLocked ? (<>
                      <button className="play" onClick={()=>handleUnlockTeam(false)}>Edit Team</button>
                    </>):(<>
                      <button className="play" onClick={()=>handleUpdateFirstEleven()}>Save</button>
                    </>)
                    } */}
                  </div>
                </div>
              ) : (
                <div className="col-12 p-0 text-center">
    
                  <div className="input-container px-2">
                    <span className="icon">
                      <img src={buyutec} alt="" />
                    </span>
                    <input className="input" type="text" placeholder="Search player" value={searchTerm} onChange={handleSearchChange}/>
                  </div>
                  <div  className="playersWrapper px-2 scroll deck">
                    <div className="accordion" id="accordionExample">
                      {filteredPlayers.length > 0 ? (
                        filteredPlayers.map((player, index) => (
                          <div className="accordion-item mb-4" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                              <button
                                className="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                              >
                                <div className="d-flex playerTop">
                                  <div className="form-check">
                                    <input onChange={()=>handleAddEleven(player.player_id)} className="form-check-input" style={{ border: "1px solid #ffff" }} type="checkbox" value="" id={`flexCheckDefault${index}`} />
                                  </div>
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
                                      <div className="col-12">{player.nationality}</div>
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
              )}
            </div>
          </div>
        </div>
      </MobilePage>
    </>
  );
};

export default Team;
