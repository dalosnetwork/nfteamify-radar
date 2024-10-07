import "../design/App.css";
import React, { useEffect, useState } from "react";
import Navbar from "../modals/navbar";
import logo from "../design/assets/logo.png";
import navlogo from "../design/assets/navlogo.png";
import dalos from "../design/assets/Dalos logo renkli 1.png";
import bg from "../design/assets/pattern.png";
import fetchAllRedux from "../redux/fetchAllRedux";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";



const Game = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get('user');
        if (userParam) {
            dispatch(fetchAllRedux());
            navigate(`/team?user=${userParam}`);
        } else {
        dispatch(fetchAllRedux());
        }
    },[]);



  return (
    <>
      <div
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${bg})`,
          backgroundSize: '100% auto',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1, // Set the desired opacity for the background
          zIndex: -1, // Place the background behind the content
        }}
      ></div>
      <div className="row text-center" style={{ zIndex: 1, width:"100%" }}>
        <div className="col-12 mb-4">
          <img style={{ maxWidth: '300px' }} src={logo} alt="" />
        </div>
      </div>
      <footer style={{ zIndex: 1, flexShrink: 0, position:"absolute", bottom:"0" }}>
        <div className="text-center">
          <p>Powered by Dalos Network©</p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Game;
