import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import GeneratePaymentPage from "./Components/GeneratePaymentPage/GeneratePaymentPage";
import LandingPage from "./Components/LandingPage/LandingPage";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import PaymentsPage from "./Components/PaymentsPage/PaymentsPage";
import PromoCodesPage from "./Components/PromoCodesPage/PromoCodesPage";

const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={LandingPage} />
        <Route exact={true} path="/promo-codes" component={PromoCodesPage} />
        <Route exact={true} path="/generate" component={GeneratePaymentPage} />
        <Route exact={true} path="/p/:paymentUUID" component={PaymentsPage} />
        <Route exact={true} path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
