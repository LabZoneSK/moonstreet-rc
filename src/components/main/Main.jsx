import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Sidebar from '../../containers/Sidebar';

/** Containers */
import Home from '../../templates/Home';
import Portfolios from '../../containers/Portfolios';
import Wallets from '../../containers/Wallets';
import Rates from '../../containers/Rates'
import ICOs from '../../containers/ICO';

const Main = () => (
  <main className="main">
    <Sidebar />
    <section className='dashboard'>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/portfolios" component={Portfolios} />
        <Route path="/portfolios/:portfolioID" component={Portfolios} />
        <Route exact path="/wallets" component={Wallets} />
        <Route path="/wallets/:walletID" component={Wallets} />
        <Route exact path="/rates" component={Rates} />
        <Route exact path="/ico" component={ICOs} />
      </Switch>
    </section>
  </main>
);

export default Main;
