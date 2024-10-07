import React, { useState, useEffect } from 'react';
import { upgradePlayer } from '../api/ApiServices';
import fetchAllRedux from '../redux/fetchAllRedux';
import { useDispatch } from 'react-redux';
import prizeimg from "../design/assets/prize.png";
import close from "../design/assets/x.png";


const ModalInfo = ({ show, onClose, data  }) => {

  const dispatch = useDispatch();
  
  const handleUpgradePlayer = async (id, pos) => {
    try {
      const data = await upgradePlayer(id, pos, "");
      if (data) {
        console.log('Player upgraded successfully');
        dispatch(fetchAllRedux())
        onClose()
      } else {
        console.log('Failed to upgrade player');
      }
    } catch (error) {
      console.error('Error upgrading player:', error);
    }
  };

  /* const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }; */

  return (
    <div className={`modal-train ${show ? 'show' : ''}`} >
        <div className="modal-content">
            <div className={`modal ${show ? 'show' : ''}`}>
              <div className="modal-background"></div>
              <div className='infoWrapper'>
                <img className="x" onClick={()=>onClose()} src={close} alt="" />
                <div className="row">
                  <div className="col-12">
                    <div className="title text-center">
                      Prize Pool
                    </div>
                    <div className="prize d-flex justify-content-center">
                      <img src={prizeimg} alt="" />
                    </div>
                    <div className="text">
                      At the end of each month, the prize pool will reward the top 10 users on the leaderboard! Keep participating to climb the ranks and win your share of the rewards!
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default ModalInfo;
