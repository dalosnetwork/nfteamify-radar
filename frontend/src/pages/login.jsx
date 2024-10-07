import "../design/App.css";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"
import logo from "../design/assets/logo.png";
import player from "../design/assets/landing/player.png";
import ball from "../design/assets/landing/ball.png";
import deckimg from "../design/assets/landing/deck1.png";
import packsimg from "../design/assets/landing/packsimg.png";
import marketimg from "../design/assets/landing/marketimg.png";
import cup from "../design/assets/landing/cup.png";
import crowd2 from "../design/assets/landing/crowd2.png";
import img1 from "../design/assets/landing/img1.png";
import qr from "../design/assets/landing/nfteamifyqr.png";
import team from "../design/assets/landing/team.png";
import trade from "../design/assets/landing/trade.png";
import match from "../design/assets/landing/match.png";
import rewards from "../design/assets/landing/rewards.png";
import dalos from "../design/assets/landing/dalos.png";
import trio from "../design/assets/landing/trio.png";
import playerright from "../design/assets/landing/player3.png";
import playerleft from "../design/assets/landing/player1.png";
import tg from "../design/assets/landing/telegram.png";
import balljson from '../design/assets/landing/balljson.json';
import Lottie from "react-lottie";

const Login = () => {



  const ballanimation = {
    loop: true,
    autoplay: true,
    animationData: balljson,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };



  return (
    <section id="landing">
      <section className="main">
        <div className="container">
          <nav>
            <div className="row d-flex justify-content-between">
              <div className="col">
                <img src={logo} className="logo" alt="" />
              </div>
              <div className="col d-flex flex-row-reverse m-auto">
              <a href="https://t.me/nfteamify_bot" target="_blank" rel="noreferrer"><button className="join">Join Now</button></a>
              </div>
            </div>
          </nav>
          <div className="row titleRow">
            <div className="col-12 titleCol my-5 my-lg-auto" data-aos="fade-up-left" data-aos-anchor="#example-anchor" data-aos-offset="500" data-aos-duration="500">
              <div className="row">
                <div className="col-12">
                  <h1 className="title"><span className="bold">NFT</span>EAMIFY</h1>
                </div>
                <div className="col-12">
                  <h2 className="title2 ps-1">The Future of Football Management</h2>
                </div>
                <div className="col-12">
                  <h3 className="title3 ps-1">
                    Create, Trade, Compete, and Earn in the Ultimate NFT
                    Football Game
                  </h3>
                </div>
                <div className="col-12 mt-2">
                <a href="https://t.me/nfteamify_bot" target="_blank" rel="noreferrer"><button className="join">Join Now</button></a>
                </div>
                <div className="col-12 mt-2">
                  <a href="https://x.com/nfteamify" target="_blank" rel="noreferrer"><button className="join small"><i class="fa-brands fa-x-twitter"></i></button></a>
                  <a href="https://t.me/nfteamify" target="_blank" rel="noreferrer"><button className="join small"><i class="fa-brands fa-telegram"></i></button></a>
                </div>
              </div>
            </div>
            <div className="col-12 d-flex d-lg-none position-relative">
            </div>
          </div>
        </div>
        <div className="ball" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="900" onClick={()=>alert("Promo Code: YJ1N8RQI")}>
          <Lottie options={ballanimation} />
        </div>
        {/* <img className="ball" src={ball} alt="" /> */}
        <img data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="700" className="player" src={player} alt="" />
        <img data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="800" className="crowd2" src={crowd2} alt="" />
        <img data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="400" className="decks" src={deckimg} alt="" />
      </section>
      <section className="section2 d-flex justify-content-center">
        <img className="playerRight" src={playerleft} alt="" />
        <img className="playerLeft" src={playerright} alt="" />
        <div className="row" style={{width:"100%"}}>
          <div className="col-12">
            <div className="wrapperOne">
              <div className="row d-flex justify-content-center">
                <div className="col-6 col-md-4 d-flex justify-content-end justify-content-lg-end mb-4"><div data-aos="fade-down" className="cardOne qr text-end"><p className="mt-3 me-3">Join <span className="bold">NFT</span><span className="thin">EAMIFY</span> on Telegram</p><img className="one" src={tg} alt="" /></div></div>
                <div className="col-6 col-md-4 d-flex justify-content-start justify-content-lg-center mb-4 wauto" ><div data-aos="fade-up" className="cardOne text-center"><p className="mt-3">Build Your Team</p><img className="two" src={team} alt="" /></div></div>
                <div className="col-6 col-md-4 d-flex justify-content-end justify-content-lg-start mb-4"><div data-aos="fade-down" className="cardOne text-end"><p className="mt-3 me-3">Train & Trade Your Players</p><img className="three" src={trade} alt="" /></div></div>
                <div className="col-6 col-md-6 d-flex justify-content-start justify-content-lg-end  mb-4"><div data-aos="fade-up" className="cardOne text-left"><p className="mt-3 ms-3">Compete</p><img className="four" src={match} alt="" /></div></div>
                <div className="col-6 col-md-6 d-flex justify-content-lg-start justify-content-center mb-4"><div data-aos="fade-down" className="cardOne text-left"><p className="mt-3 ms-3">Earn Rewards</p><img className="five" src={rewards} alt="" /></div></div>
              </div>
            </div>

          </div>
          <div className="col-12 d-flex justify-content-center">
            <div className="wrapperTwo">
              <div className="row">
                <div className="col-12 d-flex justify-content-center">
                  <div className="cardOne" >
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="500">
                        <img src={img1} alt="" />
                      </div>
                      <div className="col-12 text-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="400">
                        <p>Own your cards as NFT's</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <div className="cardTwo" >
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="500">
                        <img src={packsimg} alt="" />
                      </div>
                      <div className="col-12 text-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="400">
                        <p>Buy, sell, and trade players in the marketplace</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <div className="cardTwo" >
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="500">
                        <img src={marketimg} alt="" />
                      </div>
                      <div className="col-12 text-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="400">
                        <p> Open packs to discover new players and enhance your team</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <div className="cardTwo" >
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="500">
                        <img src={cup} alt="" />
                      </div>
                      <div className="col-12 text-center" data-aos="fade-up-left" data-aos-easing="linear" data-aos-duration="400">
                        <p className="mb-0">Win rewards in monthly seasons</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
          {/* <img src={crowd} className="crowd" alt="" /> */}
            <div className="footerWrapper">
              <div className="blur"></div>
              <div className="container py-5">
                <div className="row d-flex justify-content-between pt-4">
                  <div className="col-12 col-lg-1 d-flex">
                    <div className="row">
                      <div className="col-12 d-flex justify-content-center">
                        <img className="logo" src={logo} alt="" />
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <button className="button" ><a href="https://x.com/nfteamify" target="_blank" rel="noreferrer"><i class="fa-brands fa-x-twitter"></i>/nfteamify</a></button>
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <button className="button" ><a href="https://t.me/nfteamify" target="_blank" rel="noreferrer"><i class="fa-brands fa-telegram"></i>/nfteamify</a></button>
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <button className="button"><a href="mailto:info@dalosnetwork.com"><i class="fa-solid fa-envelope"></i> info@dalosnetwork.com</a></button>
                      </div>
                    </div>
                    
                  </div>
                  <div className="col-12 col-lg-1 mt-5 mt-lg-0 flex-row-reverse d-block d-lg-flex">
                    <div className="row">
                      <div className="col-12 text-center m-auto">
                        <img className="qrcode" src={qr} alt="" />
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <p className="try mt-2">
                          T2N9W2RE
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row d-flex justify-content-center mt-5 mt-lg-0">
                  <div className="col-12 text-center power">
                    powered by
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <div className="row">
                      <div className="col-6 d-flex justify-content-center">
                        <img className="firm mt-1 mt-lg-0" src={dalos} alt="" />
                      </div>
                      <div className="col-6 d-flex justify-content-center">
                        <img className="firm mt-1 mt-lg-0" src={trio} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      </footer>
    </section>
  );
};

export default Login;
