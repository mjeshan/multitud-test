import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Route, useLocation, Switch } from "react-router-dom";

import IntroContainer from "./IntroContainer";
import Dashboard from "../dashboard";

const Intro = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const history = useHistory();
  const introStepsCompleted = useSelector(
    (state) => state.fbCreds.introStepsCompleted
  );

  const storeName = useSelector((state) => state.fbCreds.storeName);

  useEffect(() => {
    if (introStepsCompleted) {
      history.push("/dashboard");
    } else {
      history.push("/intro/facebook");
      // history.push("/dashboard");
    }
  }, [introStepsCompleted]);

  return (
    <>
      <Switch>
        <Route path="/intro">
          <IntroContainer />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">{children}</Route>
      </Switch>
    </>
  );
};

export default Intro;
