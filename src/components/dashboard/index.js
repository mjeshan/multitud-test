import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Campaigns from "./Campaigns";
import Settings from "./Settings";
import AudienceSnackBar from "./AudienceSnackBar";

export default () => {
  return (
    <div className="flex w-full bg-gray-100">
      <Navbar />
      <main className="w-full">
        <Switch>
          <Route path="/dashboard/campaigns">
            <Campaigns />
          </Route>
          <Route path="/dashboard/settings">
            <Settings />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </main>
      <AudienceSnackBar />
    </div>
  );
};
