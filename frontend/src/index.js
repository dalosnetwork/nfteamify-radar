import React from 'react';
import "./design/App.css";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/login.jsx"
import Decks from "./pages/decks.jsx"
import Shop from './pages/shop.jsx';
import League from './pages/league.jsx';
import Promo from './pages/promo.jsx';
import Settings from './pages/settings.jsx';
import Team from './pages/team.jsx';
import { Provider } from 'react-redux';
import store from './redux/app/store.js';
import Game from './pages/game.jsx';
import Rewards from './pages/rewards.jsx';
import App from './pages/app.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/game",
    element: <Game/>
  },
  {
    path: "/team",
    element: <Team/>
  },
  {
    path: "/deck",
    element: <Decks/>
  },
  {
    path: "/league",
    element: <League/>
  },
  {
    path: "/shop",
    element: <Shop/>
  },
  {
    path: "/rewards",
    element: <Rewards/>
  },
  {
    path: "/promo",
    element: <Promo/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
