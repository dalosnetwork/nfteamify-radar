import "../design/App.css";
import React, { useEffect, useState } from "react";
import podium from "../design/assets/prize.png";
import MobilePage from "../modals/mobile";
import tokenimg from "../design/assets/token.png";
import infoimg from "../design/assets/info.png";
import ModalHistory from "../modals/modalHistory";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import fetchAllRedux from "../redux/fetchAllRedux";
import ModalInfo from "../modals/modalInfo";


const League = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [data, setData] = useState({});

  const { league } = useSelector((state) => state.league);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user.length === 0) {
      dispatch(fetchAllRedux());
    }
  }, [user, dispatch]);

  const openModal = () => {
    const newData = {
      title: 'Train Player',
      name: "Jude Bellingham",
      skill: "Defence",
      price: "0.0003"
    };
    setData(newData);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openInfoModal = () => {
    setInfoModalOpen(true);
  };

  const closeInfoModal = () => {
    setInfoModalOpen(false);
  };

  function truncateName(fullName) {
    return fullName.length > 15 ? fullName.slice(0, 10) + "..." : fullName;
  }

  const [timeRemaining, setTimeRemaining] = useState(getTimeUntilNextMonth());

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = getTimeUntilNextMonth();
      setTimeRemaining(timeLeft);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  function getTimeUntilNextMonth() {
    const now = new Date();
    
    // Calculate 11:00 PM on the first day of the next month
    const nextMonth11PM = new Date(now.getFullYear(), now.getMonth() + 1, 1, 23, 0, 0); 

    const timeDiff = nextMonth11PM - now; // Difference in milliseconds

    if (timeDiff <= 0) {
      // If we passed 11:00 PM of the first of the next month, move to the next month
      return getTimeUntilNextMonth();
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);

    return { days, hours, minutes };
  }

  return (
    <>
      <ModalHistory show={isModalOpen} onClose={closeModal} data={data}/>
      <ModalInfo show={isInfoModalOpen} onClose={closeInfoModal} data={data}/>
      <MobilePage data={true}>
        <div id="league">
          <h1 className="header">
            <div className="row d-flex justify-content-between">
              <div className="col-2 my-auto">
                <h1 className="title m-0">LEAGUE</h1>
              </div>
              <div className="col-2 d-flex" style={{flexDirection:"row-reverse"}}>
                <div className="budgetWrapper">
                  <img className="token" src={tokenimg} alt="" />
                  <span className="budget">{user?.data?.user?.balance !== undefined ? user.data.user.balance : 'Loading...'}</span>
                </div>
              </div>
            </div>
          </h1>
          <div className="container d-flex justify-content-center p-0">
            <div className="row d-flex justify-content-center" style={{width:"100%"}}>
                <div className="col-12 p-0">
                  <div className="podiumWrapper">
                    <button className="history" onClick={()=>openModal()} ><i className="fa-solid fa-clock-rotate-left"></i></button>
                    <div className="row m-auto" style={{width:"100%"}}>
                      <div className="col-12 text-center">
                        <h1 className="header1 mt-3">Prize Pool <span onClick={()=>openInfoModal()}><img src={infoimg} className="info" alt="" /></span></h1>
                        <p className="prize">{league.data.prize.toLocaleString('en-US')}</p>
                      </div>
                      <div className="col-12 p-0 d-flex justify-content-center">
                        <img src={podium} className="podium" alt="" />
                      </div>
                      <div className="col-12 text-center timer mb-4 mt-1">
                        {timeRemaining.days}D:{timeRemaining.hours}H:{timeRemaining.minutes}M
                      </div>
                    </div>
                  </div>
                  <div className="leaderboardWrapper">
                    <div className="row" style={{width:"100%"}}>
                      <div className="col-12 p-0 d-flex justify-content-center">
                        <div className="d-flex row justify-content-center text-center title" style={{color:"white", width:"100%"}}>
                          <div className="col-2"></div>
                          <div className="col-5 text-start ">Player Name</div>
                          <div className="col-5 text-start ">Score</div>
                          
                        </div>
                      </div>
                      <div className="col-12 p-0 scroll">
                        <ul>
                          {league.data && Object.entries(league.data.top_players.order).map(([user, score], index) => (
                            <li style={{ color: "white" }} key={index}>
                              <div className="d-flex row text-center justify-content-center">
                                <div className="col-2">{index + 1}</div>
                                <div className="col-5 text-start">{truncateName(user)}</div>
                                <div className="col-5 text-start">{score}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </MobilePage>
    </>
  );
}

export default League;
