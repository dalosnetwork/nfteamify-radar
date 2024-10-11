import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Card from './card';
import copyimg from "../design/assets/copy.svg"
import walletimg from "../design/assets/wallet.svg"

const ModalWallet = ({ show, onClose  }) => {

  const navigate = useNavigate();
  const [copySuccess, setCopySuccess] = useState("");

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("3f4T6Fg1pLE3CsDzqpRREHscfj4Zyg96B8Q9rnMyQ1av");
      setCopySuccess("Adress copied!");
    } catch (err) {
      setCopySuccess("Failed to copy adress.");
    }
  };

  return (
    <div className={`modal-wallet ${show ? 'show' : ''}`} >
        <div className="modal-background"></div>
        <div className="modal-content">
            <div className={`modal ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
              <div className='walletWrapper justify-content-center d-flex'>
                <img className='copy' src={copyimg} alt="" onClick={()=>copyToClipboard()} />
                <div className="row" style={{width:"100%"}}>
                    <div className="col-12"><span>Wallet Adress:</span> <br /> 3f4T6Fg1pLE3CsDzqpRREHscfj4Zyg96B8Q9rnMyQ1av </div>
                    <div className="col-12"><span>Balance:</span> 12.431 SOL </div>
                    <div className="col-12 text-center">{copySuccess}</div>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default ModalWallet;
