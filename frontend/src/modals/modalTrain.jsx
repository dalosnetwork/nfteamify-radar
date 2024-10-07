import React, { useState, useEffect } from 'react';
import { upgradePlayer } from '../api/ApiServices';
import fetchAllRedux from '../redux/fetchAllRedux';
import { useDispatch } from 'react-redux';
import tokenimg from "../design/assets/token.png";


const ModalTrain = ({ show, onClose, data  }) => {

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
              <div className='trainWrapper'>
                <div className="row">
                  {data && data.player ? (
                    <>
                      <div className="col-12">
                        <h1 className='text-center title'>Train Player</h1>
                        <p className='text'>Training <span className='bold'>{data.player.name}</span>’s {data.pos} costs <span className='bold'> {data.price} <img src={tokenimg} style={{width:"20px"}} alt="" /></span>. Do you wish to proceed?</p>
                      </div>
                      <div className="col-12">
                        <button onClick={()=>handleUpgradePlayer(data.player.player_id, data.pos)} className='accept'>Train</button>
                      </div>
                      <div className="col-12">
                        <button onClick={()=>onClose()} className='cancel'>Cancel</button>
                      </div>
                    </>
                  ):(
                    <>
                    
                    </>
                  )
                  }
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default ModalTrain;
