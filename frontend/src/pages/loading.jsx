import "../design/App.css";
import React, { useEffect, useState } from "react";
import balljson from '../design/assets/landing/balljson.json';
import Lottie from "react-lottie";
import logo from "../design/assets/logo.png";

const Loading = () => {


  const ballanimation = {
    loop: true,
    autoplay: true,
    animationData: balljson,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
      <section id="loading">
        <div className="container" data-aos="zoom-in">
          <div className="row" >
            {/* <div className="col-12 d-flex justify-content-center">
              <img src={logo} className="logo" alt="" />
            </div> */}
            <div className="col-12 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
              <div className="ball d-flex">
                L
                <Lottie options={ballanimation} />
                ADING...
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Loading;
