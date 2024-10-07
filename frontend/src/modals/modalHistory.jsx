import React, { useState, useEffect } from "react";
import close from "../design/assets/x.png"
import { useSelector } from "react-redux";
import ModalCard from "../modals/modalCard";

const ModalTrain = ({ show, onClose, data }) => {
  
  const [firstEleven, setFirstEleven] = useState({});
  const { league } = useSelector((state) => state.league);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (league && league.data) {
      setFirstEleven(league.data.history);
    }
  }, [league]);
  

  function truncateName(fullName) {
    const parts = fullName.split(" ");
    const firstNameInitial = parts[0].charAt(0);
    const truncatedName = `${firstNameInitial}. ${parts.slice(1).join(" ")}`;
    return truncatedName;
  }
 

  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
    
    <ModalCard show={isModalOpen} onClose={closeModal} data={data} />
    <div
      className={`modal-history ${show ? "show" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-content">
        <div className={`modal ${show ? "show" : ""}`}>
          <div className="modal-background"></div>
          <div className="trainWrapper">
            <img className="x" onClick={()=>onClose()} src={close} alt="" />
            <div className="row text-center">
              <h1 className="title">Your Last Team</h1>
              <div className="col-12 d-flex justify-content-center scroll">
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
                                  onClick={() => setModalOpen()}
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
                                  onClick={() => setModalOpen()}
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
                                  onClick={() => setModalOpen()}
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
                                  }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ModalTrain;
