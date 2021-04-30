import React, { useEffect } from "react";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "typeface-roboto";
import * as AppAction from "../actions/appAction";

import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

import ProfileLoadingView from "../components/profile/profileLoadingView";
import NavBar from "../components/app/navBar";
import EULAView from "../components/profile/eula";
import ShopifyConnectView from "../components/profile/shopifyConnect";
import PieContent from "../components/app/pieContent";
import TimeSeriesContent from "../components/app/timeSeriesContent";
import SectionContent from "../components/app/sectionContent";
import { trimUrl } from "../modules/commonModule";
import Scrollbar from "react-scrollbars-custom";
import Intro from "../components/intro";

const navBarHeight = "3rem";

// let theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: "#08b9ffff",
//       main: "#0887ff",
//       dark: "#0887ff",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#f7ac13",
//       main: "#ffab40",
//       dark: "#ef9101",
//       contrastText: "#fff",
//     },
//   },
// });
let theme = createMuiTheme({
  palette: {
    primary: {
      light: "#08b9ffff",
      main: "#00986D",
      dark: "#0887ff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#f7ac13",
      main: "#ffab40",
      dark: "#ef9101",
      contrastText: "#fff",
    },
  },
  shape: {
    borderRadius: 3,
  },
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // height: "100vh",
  },
  content: {
    //   flexGrow: 1,
    width: "100%",
    height: "100%",
    //height: '100vh',
  },
  logoContainer: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "flex-start",
  },
  hyperLink: {
    all: "unset",
    "&:hover": {
      "background-color": "transparent",
      cursor: "pointer",
    },
  },
  logOutButton: {
    width: "74%",
    "align-self": "center",
    margin: "3.5vh",
    marginTop: "2.5vh",
  },
}));

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(AppAction.logOut()),
    clearCookie: () => dispatch(AppAction.clearCookie()),
    getCurrentUser: () => dispatch(AppAction.getCurrentUser()),
    getEULA: () => dispatch(AppAction.getEULA()),
    signEULA: (userId, profile) =>
      dispatch(AppAction.signEULA(userId, profile)),
    startInitialization: () => dispatch(AppAction.startInitialization()),
    incrementInit: () => dispatch(AppAction.incrementInit()),
    getAnalysis: (analysisId) => dispatch(AppAction.getAnalysis(analysisId)),
    authEmailMarketing: (userName, userGroup) =>
      dispatch(AppAction.authEmailMarketing(userName, userGroup)),
    sendEmailCampaign: (campaignId, segments) =>
      dispatch(AppAction.sendEmailCampaign(campaignId, segments)),
    getEmailCampaigns: () => dispatch(AppAction.getEmailCampaigns()),
  };
};

function Application(props) {
  const classes = useStyles();
  const {
    profile,
    analysis,
    isBusy,
    currentAnalysis,
    emailCampaignBusy,
    emailCampaigns,
    emailLists,
  } = props.app;
  const {
    getAnalysis,
    clearCookie,
    authEmailMarketing,
    sendEmailCampaign,
    getEmailCampaigns,
  } = props;
  // const returnUrl = trimUrl(props.location.pathname);
  useEffect(() => {
    if (!props.app.profileLoaded) {
      props.getCurrentUser();
      props.getEULA();
    }

    return () => {};
  }, []);

  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          {!props.app.profileLoaded ? (
            <ProfileLoadingView
              isBusy={isBusy}
              profileLoaded={props.app.profileLoaded}
              clearCookie={props.clearCookie}
              errorMessage={props.app.errorMessage}
            />
          ) : profile.status && profile.status.eulaSigned ? (
            /* profile.status.intializationComplete ? */
            <Intro>
              <React.Fragment>
                <Route
                  path={"/"}
                  render={(props) => (
                    <NavBar
                      getAnalysis={getAnalysis}
                      analysis={analysis}
                      navBarHeight={navBarHeight}
                      profile={profile}
                      clearCookie={clearCookie}
                      currentAnalysis={currentAnalysis}
                      authEmailMarketing={authEmailMarketing}
                      sendEmailCampaign={sendEmailCampaign}
                      getEmailCampaigns={getEmailCampaigns}
                      emailCampaignBusy={emailCampaignBusy}
                      emailCampaigns={emailCampaigns}
                      emailLists={emailLists}
                      isBusy={isBusy}
                      {...props}
                    />
                  )}
                />
                <Scrollbar
                  disableTracksWidthCompensation
                  noScrollX
                  className={classes.content}
                >
                  <Switch>
                    {Array.isArray(analysis) && analysis.length > 0
                      ? analysis.map((item, i) => {
                          return (
                            <Route
                              path={"/" + item.analysisName}
                              key={i}
                              render={(props) => {
                                if (
                                  item.analysisCategory ===
                                    "EXTERNAL_UNSUPERVISED" ||
                                  item.analysisType == "PRODUCT_SEGMENT"
                                ) {
                                  return (
                                    <SectionContent
                                      analysisItem={item}
                                      isBusy={isBusy}
                                      currentAnalysis={currentAnalysis}
                                      getAnalysis={getAnalysis}
                                      analysisType={item.analysisType}
                                    />
                                  );
                                } else if (
                                  item.analysisCategory ===
                                  "INTERNAL_SUPERVISED"
                                ) {
                                  return (
                                    <TimeSeriesContent
                                      analysisItem={item}
                                      isBusy={isBusy}
                                      currentAnalysis={currentAnalysis}
                                      getAnalysis={getAnalysis}
                                      profile={profile}
                                    />
                                  );
                                }
                              }}
                            />
                          );
                        })
                      : null}
                  </Switch>
                </Scrollbar>
              </React.Fragment>
            </Intro>
          ) : (
            /*: (
              <ShopifyConnectView
                isBusy={isBusy}
                profile={profile}
                startInitialization={props.startInitialization}
                errorMessage={props.app.errorMessage}
                incrementInit={props.incrementInit}
                updateProfile={props.getCurrentUser}
              />
            ) */
            <EULAView
              isBusy={isBusy}
              profile={profile}
              clearCookie={props.clearCookie}
              signEula={props.signEULA}
              eula={props.app.eula}
            />
          )}
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);
