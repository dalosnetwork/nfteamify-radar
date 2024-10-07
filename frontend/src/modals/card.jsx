import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import cardimg from "../design/assets/card.png"

const Card = ({ data, big }) => {

  function truncateName(fullName) {
    const parts = fullName.split(" ");
    const firstNameInitial = parts[0].charAt(0);
    const truncatedName = `${firstNameInitial}. ${parts.slice(1).join(" ")}`;
    return truncatedName.toUpperCase();
  }
  console.log(data)
  
  return (
    <>
       <div className={`singleCardWrapper ${big ? 'big' : ''}`}>
        <img className='image' src={cardimg} alt="" />
        <div className='number1'>
          {data && data.number}
        </div>
        <div className='position'>
          {data && data.position}
        </div>
        <div className="number">
          {data && data.Overall}
        </div>
        <div className="name">
          {data && truncateName(data.name)}
        </div>
        <div className="att text-start">
          <ul>
            <li><span style={{fontWeight:"bold"}}>FRW:</span> {data && data.FRW}</li>
            <li><span style={{fontWeight:"bold"}}>MD:</span> {data && data.MD}</li>
            <li><span style={{fontWeight:"bold"}}>DEF:</span> {data && data.DEF}</li>
            <li><span style={{fontWeight:"bold"}}>GK:</span> {data && data.GK}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Card;
