import React from "react";
import "./styles/App.css";
import LoginPanel from "./components/login/loginPanel";
import * as Requests from "./request/requests";
import Application from "./containers/application";
import LoadingScreen from "./components/login/loadingScreen";
import { initializeReactGA } from "./trackers/appEventTracker";
import { isProd } from "./request/config";

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: null,
    };
    if (isProd) {
      initializeReactGA();
    }
    Requests.getLogin()
      .then((response) => {
        this.setState({ isHidden: true });
      })
      .catch((error) => {
        this.setState({ isHidden: false });
      });
  }

  render() {
    return (
      <div className="App" style={{ height: "100%" }}>
        {this.state.isHidden === null ? (
          <LoadingScreen />
        ) : this.state.isHidden ? (
          <Application />
        ) : (
          <LoginPanel />
        )}
      </div>
    );
  }
}

export default AppContainer;
