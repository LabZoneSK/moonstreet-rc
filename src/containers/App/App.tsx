import React, { Fragment, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import Login from '../Login/Login';

import { database, auth, storageKey, isAutheticated } from "../../firebase";
import { loadUserSettings } from "./actions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Dashboard</div>,
  },
  {
    path: "/portfolios",
    element: <div>Portfolios</div>,
  },
  {
    path: "/portfolios/:portfolioID",
    element: <div>Portfolio : ID</div>,
  },
  {
    path: "/wallets",
    element: <div>Wallets</div>,
  },
  {
    path: "/wallets/:walletID",
    element: <div>Wallet : ID</div>,
  },
  {
    path: "/portfolios/:portfolioID",
    element: <div>Portfolio : ID</div>,
  },
  {
    path: "/rates",
    element: <div>Rates</div>,
  },
  {
    path: "/ico",
    element: <div>ICOs</div>,
  },
  {
    path: "/coinPotential",
    element: <div>CoinPotential</div>,
  },
  {
    path: "/settings",
    element: <div>Settings</div>,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
]);



function App() {
  const [isAutheticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState({ database: false, rates: false });

  // auth.onAuthStateChanged((user) => {
  //   console.log(user);
  //   setLoading(() => ({
  //       database: true,
  //       rates: true,
  //   }));
  // });

  const Page = () => {
    if (!isAutheticated) {
      if (!loading.database && !loading.rates) {
      return (
        <Fragment>
          {/* <Header /> */}
          <main className="main">
            {/* <Sidebar /> */}
            <section className="dashboard">
              <RouterProvider router={router} />
            </section>
          </main>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          Loading data
        </Fragment>
      )
    } 
  } else {
    return (
        <Login />
    )
  }
  };

  return (
    <Fragment>
      <Page />
    </Fragment>
  );
}

export default App;
