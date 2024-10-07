import "../design/App.css";
import React, { useEffect, useState } from "react";
import Navbar from "../modals/navbar";
import logo from "../design/assets/logo.png";
import MobilePage from "../modals/mobile";
import Modal from "../modals/modal1";
import { submitPromoCode } from "../api/ApiServices";

/* import { useNavigate } from 'react-router-dom';
import logo from "../Assets/logo-renkli.png";
import { loginUser } from '../ApiService';
import { useDispatch } from 'react-redux';
import fetchAllRedux from '../redux/fetchAllRedux';
import { successNotification } from '../Modals/Notification';
*/

const Promo = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [username, setUsername] = useState(window.innerHeight);
  const [isModalOpen, setModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  
  useEffect(() => {
    // Get the current URL
    const url = window.location.href;
    console.log('Current URL:', url);

    // Use URL object to parse the URL
    const urlObj = new URL(url);
    console.log('Parsed URL Object:', urlObj);

    // Extract the 'user' parameter value directly
    const fullUserParam = urlObj.searchParams.get('user');
    console.log('Extracted user parameter:', fullUserParam);

    // Since the URL has nested query parameters, decode the user value correctly
    if (fullUserParam) {
      const userValue = decodeURIComponent(fullUserParam);
      console.log('Decoded user value:', userValue);
      setUsername(userValue);
      console.log(userValue)
    }
  }, []);



  const handlePromoCodeSubmit = async () => {
    try {
      const data = await submitPromoCode(promoCode, username);
      if (data.status === 200) {
        console.log(data);
        openModal()
      } 
      else if(data.status === 403) {
        alert('This code has been used before or does not exist');
      }
    } catch (error) {
      console.error('Error submitting promo code:', error);
    }
  };

 

  const [error, setError] = useState('');

  const handlePromoCode = (event) => {
    const value = event.target.value;
    const regex = /^[a-zA-Z0-9]{0,30}$/;

    if (regex.test(value)) {
      setPromoCode(value);
    } else {
      console.log('Promo code must be 10 letters or digits.');
    }
  };


  // DESIGN

  const openModal = async () => {
    setModalOpen(true);
  };

  const closeModal = async () => {
    setModalOpen(false);
  };


  const handleResize = () => {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerStyle = {
    width: viewportWidth > 500 ? "500px" : "100vw",
    height: "100vh",
    overflowX: "hidden",
    display: "flex",
    margin: "auto",
    backgroundColor: "#020A35",
    /* flexDirection: 'column', */
    justifyContent: "center",
    /* alignItems: 'center', */
    boxSizing: "border-box",
    paddingBottom: "100px",
    position: "relative",
  };

  return (
    <>
      <div style={containerStyle}>
        <div className="container">
          <div className="row d-flex flex-column align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-12 text-center" style={{ marginBottom: 'auto' }}>
              <img src={logo} style={{ maxWidth: "170px", marginBottom: "30px", marginTop: "8rem" }} alt="logo" />
              <h2 style={{ fontSize: "32px" }}>Welcome!</h2>
            </div>
            <div className="col-12 promoWrapper justify-content-between align-items-center p-0" style={{ fontSize: "14px", width: "300px", marginTop: 'auto', marginBottom:"6rem" }}>
              <p className="promoText">Enter promo code:</p>
              <input type="text" placeholder="Enter promo code" onChange={handlePromoCode} className="inputPromo" value={promoCode}/>
              <button className="buttonPromo" onClick={()=>handlePromoCodeSubmit()}>
                Get Rewards
              </button>
            <Modal show={isModalOpen} onClose={closeModal}/>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Promo;
