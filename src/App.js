import React, { useEffect } from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import GeneratePaymentPage from "./Components/GeneratePaymentPage/GeneratePaymentPage";
import LandingPage from "./Components/LandingPage/LandingPage";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import PaymentsPage from "./Components/PaymentsPage/PaymentsPage";
import PromoCodesPage from "./Components/PromoCodesPage/PromoCodesPage";
import fetchUtil from "./Functions/fetchUtils";
import openURL from "./Functions/openURL";
import { connect } from "react-redux";

const UnconnectedApp = (props) => {
  useEffect(() => {
    if (!props.user) {
      const checkUserLoginStatus = async () => {
        let response = await fetchUtil("/users/status", "GET", "");

        if (response.success) {
          props.dispatch({
            type: "set-user",
            value: response.data,
          });
        } else {
          // openURL(process.env.REACT_APP_LANDING_URL);
          console.log(response.message);
        }
      };

      checkUserLoginStatus();
      return;
    }
  }, []);

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

let App = connect()(UnconnectedApp);
export default App;
