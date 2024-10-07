import React, { useState, useEffect, Suspense } from 'react';
import Loading from './loading';
import AOS from "aos";
import balljson from '../design/assets/landing/balljson.json';
import Lottie from 'react-lottie';

// Lazy load your main content components
const MainContent = React.lazy(() => import("./login"));

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const ballanimation = {
    loop: true,
    autoplay: true,
    animationData: balljson,
    rendererSettings: {

      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(()=>{
    console.log("Promo Code: TEQBJ9G4")
    AOS.init({});
    AOS.refresh();
  },[])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSplash ? (
        <Loading />
      ) : (
        <Suspense fallback={
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
        </>}>
          <MainContent />
        </Suspense>
      )}
    </>
  );
};

export default App;