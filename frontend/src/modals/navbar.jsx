import React from 'react';

import navlogo from "../design/assets/navlogo.png"
import nav1 from "../design/assets/nav1.png"
import nav2 from "../design/assets/nav2.png"
import nav3 from "../design/assets/nav3.png"
import nav4 from "../design/assets/nav4.png"
import nav5 from "../design/assets/nav5.png"
import nav6 from "../design/assets/nav6.png"
import '../design/App.css';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const urlParams = new URLSearchParams(window.location.search);
  const TEST_USER = urlParams.get('user');

  return (
    <nav className="navbar">
      <div className="container d-flex justify-content-center">
        <div className="row">
          <div className={splitLocation[1] === "deck" ? "active nav-item col d-flex text-center" : "nav-item col d-flex text-center"}>
            <NavLink exact to={`/deck?user=${TEST_USER}`} className='' activeClassName="active">
              <div className="col-12">
                <img src={nav3} alt="Deck Icon" />
              </div>
              <div className="col-12">
                Deck
              </div>
            </NavLink>
          </div>
          <div className={splitLocation[1] === "team" ? "active nav-item col d-flex text-center" : "nav-item col d-flex text-center"}>
            <NavLink exact to={`/team?user=${TEST_USER}`} className='' activeClassName="active">
              <div className="col-12">
                <img src={nav1} alt="Team Icon" />
              </div>
              <div className="col-12">
                Lineup
              </div>
            </NavLink>
          </div>
          <div className={splitLocation[1] === "league" ? "active nav-item col d-flex text-center" : "nav-item col d-flex text-center"}>
            <NavLink exact to={`/league?user=${TEST_USER}`} className='' activeClassName="active">
              <div className="col-12">
                <img src={nav5} alt="League Icon" />
              </div>
              <div className="col-12">
                League
              </div>
            </NavLink>
          </div>
          <div className={splitLocation[1] === "shop" ? "active nav-item col d-flex text-center" : "nav-item col d-flex text-center"}>
            <NavLink exact to={`/shop?user=${TEST_USER}`} className='' activeClassName="active">
              <div className="col-12">
                <img src={nav4} alt="Market Icon" />
              </div>
              <div className="col-12">
                Market
              </div>
            </NavLink>
          </div>
          <div className={splitLocation[1] === "rewards" ? "active nav-item col d-flex text-center" : "nav-item col d-flex text-center"}>
            <NavLink exact to={`/rewards?user=${TEST_USER}`} className='' activeClassName="active">
              <div className="col-12">
                <img src={nav6} alt="Market Icon" />
              </div>
              <div className="col-12">
                Rewards
              </div>
            </NavLink>
          </div>
          {/* <div className={splitLocation[1] === "settings" ? "active nav-item col d-flex text-center" : "nav-item col d-flex text-center"}>
            <NavLink exact to={"/settings"} className='' activeClassName="active">
              <div className="col-12">
                <img src={nav2} alt="Settings Icon" />
              </div>
              <div className="col-12">
                Settings
              </div>
            </NavLink>
          </div> */}
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
