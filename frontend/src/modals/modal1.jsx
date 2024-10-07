import React, { useState, useEffect } from 'react';

const Modal = ({ show, onClose, children }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (show) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            window.location.href = 'https://t.me/nfteamify'; // Replace with your desired URL
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [show]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content" style={{ maxWidth: "400px", backgroundColor: "white", position: "relative" }}>
        <div className={`modal ${show ? 'show' : ''}`}>
          <button className="close-button" onClick={onClose}>X</button>
          <div className="col-12">
            <p className='m-0'>Congratulations! Your promo code has been activated.</p><br />
            <p className='text-center'>{countdown}</p>
          </div>
          <div className="col-12">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
