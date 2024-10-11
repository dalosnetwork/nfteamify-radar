import "../design/App.css";
import React, { useEffect, useState } from "react";
import tokenimg from "../design/assets/token.png";
import MobilePage from "../modals/mobile.jsx";
import gift from "../design/assets/gift.png";
import gift2 from "../design/assets/gift2.png";
import { useDispatch, useSelector } from "react-redux";
import fetchAllRedux from "../redux/fetchAllRedux.js";
import { useNavigate } from "react-router";
import { completeMission } from "../api/ApiServices.js";
import ModalWallet from "../modals/modalWallet.jsx";
import walletimg from "../design/assets/wallet.svg"

const Rewards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { deck } = useSelector((state) => state.deck);
  const { user } = useSelector((state) => state.user);
  console.log(user)

  useEffect(() => {

    if (!user || user.length === 0 || user === undefined) {
      dispatch(fetchAllRedux());
    }
  }, [deck, user, dispatch]);

  const handleCompleteMission = async (missionId, link) => {
    try {
      const data = await completeMission(missionId);
      console.log(data)
      if (data && data.status !== 403) {

        console.log('Mission completed successfully');
        dispatch(fetchAllRedux());
      } else {
        console.log('Failed to complete mission');
      }
    } catch (error) {
      console.error('Error completing mission:', error);
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
      <MobilePage data={false}>
        <div id="rewards">
          <h1 className="header">
            <div className="row d-flex justify-content-between">
              <div className="col-2 my-auto">
                <h1 className="title m-0">REWARDS</h1>
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
                      {sessionStorage.getItem("balance")}
                  </span>
                </div>
              </div>
            </div>
          </h1>
            {
              user.data && user.data.missions.length !== 0 ? (<>
                <div className="gift">
                  <img src={gift} className="gift" alt="" />
                </div>
              </>):(
                <>
                <div className="gift">
                  <p className="text1">Congratulations, Master Collector! You've claimed every reward.</p>
                  <img src={gift2} className="gift" alt="" />
                  <p className="text2">Stay tuned for more exclusive rewards!</p>
                </div>
                </>
              )
            }
       
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-12 text-center">
                <div className="rewardsWrapper scroll">
                  <div className="row">
                    {user.data &&
                      user.data.missions.map((mission, index) => (
                        <>
                          <div className="col-12 px-4" key={index}>
                            <div className="path">
                              <div className="reward">
                                <div className="row" style={{width:"100%"}}>
                                  <div className="col-7 my-auto text-start">
                                    <div className="title ps-3">
                                      {mission.mission_name}
                                    </div>
                                  </div>
                                  <div className="col-5 d-flex flex-row-reverse">
                                      <div className="button text-center" onClick={()=>handleCompleteMission(mission.mission_id)}>
                                        <a href={mission.mission_link} target="_blank" rel="noreferrer" >
                                          Get <br />
                                          <img src={tokenimg} className="token" alt="" />
                                          {mission.reward}
                                        </a>
                                      </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}X
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

export default Rewards;
