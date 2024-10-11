import React from "react";
import walletimg from "../design/assets/wallet.svg";

const Wallet = ({ data, big }) => {
  return (
    <div className="ms-2 d-flex align-center wallet-container">
        <img src={walletimg} alt="Wallet" />      
    </div>
  );
};

export default Wallet;
