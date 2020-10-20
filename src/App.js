import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import PaymentsPage from "./Components/PaymentsPage/PaymentsPage"


const App = (props) => {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={PaymentsPage} />
        <Route exact={true} path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
