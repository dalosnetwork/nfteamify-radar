import React, { useState } from 'react';
import { sellPlayer } from '../api/ApiServices';
import { useDispatch } from 'react-redux';
import fetchAllRedux from '../redux/fetchAllRedux';

const ModalSell = ({ show, onClose, data  }) => {
  const dispatch = useDispatch();

  const [isSelled, setIsSelled] = useState(false);
  const [price, setPrice] = useState(''); // State for the input value

  const handleSellPlayer = async (playerId, price) => {
    try {
      const data = await sellPlayer(playerId, price);
      if (data) {
        console.log('Player sold successfully');
        dispatch(fetchAllRedux());
      } else {
        console.log('Failed to sell player');
      }
    } catch (error) {
      console.error('Error selling player:', error);
    }
    setIsSelled(true);
  };

  const handleClose = async () => {
    onClose();
    setIsSelled(false);
    setPrice(''); // Reset the input value when the modal is closed
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value); // Update state when input value changes
  }

  return (
    <div className={`modal-sell ${show ? 'show' : ''}`} >
      <div className="modal-content">
        <div className={`modal ${show ? 'show' : ''}`}>
          <div className="modal-background"></div>
          <div className='trainWrapper'>
            <div className="row">
              {!isSelled ? (
                <>
                  {data && data.player ? (
                    <>
                      <div className="col-12">
                        <h1 className='text-center title'>Sell Player</h1>
                        <p className='text'>Enter the price you’d like to sell <span className='bold'>{data.player.name}</span> for;</p>
                        <input 
                          type="text" 
                          placeholder='value' 
                          value={price} 
                          onChange={handlePriceChange} // Attach change handler
                        />
                      </div>
                      <div className="col-12">
                        <button onClick={() => handleSellPlayer(data.player.player_id, price)} className='accept'>Sell</button>
                      </div>
                      <div className="col-12">
                        <button onClick={handleClose} className='cancel'>Back</button>
                      </div>
                    </>
                  ) : (<></>)}
                </>
              ) : (
                <>
                  <p className='text mb-1'><span className='bold'>Name: </span>{data.player.name}</p>
                  <p className='text mb-1'><span className='bold'>Price: </span>{price}</p>
                  <p className='text small mb-1'>5% commission fee is added automatically</p>
                  <div className="col-12">
                    <button onClick={handleClose} className='accept'>Back</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSell;
