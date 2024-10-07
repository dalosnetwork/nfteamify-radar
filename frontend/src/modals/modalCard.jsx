import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Card from './card';

const ModalCard = ({ show, onClose, data  }) => {

  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div className={`modal-card ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className={`modal ${show ? 'show' : ''}`}>
                <div className="row">
                    <div className="col-12">
                        <p className='text-center text'>Card Added to Your Team!</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        {data.player && <Card data={data.player.data[0]} big={true}/> }
                    </div>
                    <div className="col-12 p-0 d-flex justify-content-center">
                        <button onClick={()=>navigate(`/${data.btn1.toLowerCase()}`)} className='button'>{data.btn1}</button>
                    </div>
                    <div className="col-12 p-0 d-flex justify-content-center">
                        <button onClick={onClose} className='button'>{data.btn2}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ModalCard;
