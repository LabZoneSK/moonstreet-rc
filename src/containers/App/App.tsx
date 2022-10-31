import React, { Fragment } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

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
  return (
    <div>
      {/* <Header /> */}
      <main className="main">
            {/* <Sidebar /> */}
            <section className="dashboard">
              <RouterProvider router={router} />
            </section>
          </main>
    </div>
  );
}

export default App;
