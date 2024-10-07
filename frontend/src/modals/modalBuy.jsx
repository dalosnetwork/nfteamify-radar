import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { buyFromMarket } from '../api/ApiServices';
import Card from './card';
import fetchAllRedux from '../redux/fetchAllRedux';
import { useDispatch } from 'react-redux';

const ModalBuy = ({ show, onClose, data  }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleBuyFromMarket = async (id) => {
  try {
    const data = await buyFromMarket(id);
    if (data) {
      console.log('Market purchase successful');
      dispatch(fetchAllRedux());
    } else {
      console.log('Failed to purchase from market');
    }
  } catch (error) {
    console.error('Error purchasing from market:', error);
  }
};


  return (
    <div className={`modal-card ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="row">
                    <div className="col-12">
                        <p className='text-center text'>Buy Player</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <Card data={data.player} big={true}/>
                    </div>
                    <div className="col-12 p-0 d-flex justify-content-center">
                        <button onClick={()=>handleBuyFromMarket(data.player.player_id)} className='button'>BUY</button>
                    </div>
                    <div className="col-12 p-0 d-flex justify-content-center">
                        <button onClick={onClose} className='button'>CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ModalBuy;
