// src/modals/MobilePage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../modals/navbar.jsx';
import PropTypes from 'prop-types';

const MobilePage = ({ children, data }) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const containerStyle = {
    width: viewportWidth > 500 ? '500px' : '100vw',
    height: '100vh',
    /* overflow: 'hidden', */
    display: 'flex',
    margin: "auto",
    backgroundImage: "linear-gradient(to bottom, #020A35 0%, #000106 150%)",    
    justifyContent: 'center',
    boxSizing: 'border-box',
    paddingBottom: "96px",
    position: "relative",
  };

  return (
    <>
      <div style={containerStyle}>
        <div className={!data ? 'cut-bottom-border content' : 'cut-bottom-border content small' }>
          <div className='mainContent'>
            {children}
          </div>
        </div>
        <Navbar/>
        <div className='navback1'></div>
        <div className='navback'></div>
      </div>
    </>
  );
};

MobilePage.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.any.isRequired,
};

export default MobilePage;
