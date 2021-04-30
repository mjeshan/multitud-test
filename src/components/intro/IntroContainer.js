import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useHistory,
  Route,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { Fade } from "@material-ui/core";

import ConnectFB from "./ConnectFB";
import FbSelectors from "./FbSelectors";
import Header from "./Header";
import Initialize from "./Initialize";
import Audience from "./Audience";

import {
  fetchAllFbBusiness,
  slectFBBusiness,
  fetchAllFbAdAccounts,
  selectFBAdAccount,
  fetchAllFbPages,
  selectFBPage,
} from "../../actions/fbActions";

function useLocationQuery() {
  return new URLSearchParams(useLocation().search);
}

const InroContainer = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const query = useLocationQuery();
  const { path } = useRouteMatch();

  const step = query.get("step");

  const loading = useSelector((state) => state.fbCreds.loading);
  const fbStep = useSelector((state) => state.fbCreds.fb.step);
  const pageLoading = useSelector((state) => state.fbCreds.pageLoading);
  const fbStepsCompleted = useSelector((state) => state.fbCreds.fb.completed);
  const initializatiopnCompleted = useSelector(
    (state) => state.fbCreds.initializatiopnCompleted
  );

  useEffect(() => {
    if (fbStepsCompleted) history.push("/intro/initialize");
  }, [fbStepsCompleted]);

  useEffect(() => {
    if (initializatiopnCompleted) history.push("/intro/audience");
  }, [initializatiopnCompleted]);

  return (
    <>
      <Fade in={pageLoading} {...{ timeout: 700 }}>
        <div className="container mx-auto text-center py-5">
          <div className="mb-5">
            <Header />
          </div>
          <Route path={`${path}/facebook`} exact>
            {fbStep === "connect" && <ConnectFB />}
            {fbStep === "business" && (
              <FbSelectors
                onInit={fetchAllFbBusiness}
                onSelect={slectFBBusiness}
                title="Select a Business"
                subtitle="Please select a business for Odaia Ads."
                loading={loading}
              />
            )}
            {fbStep === "ad_account" && (
              <FbSelectors
                onInit={fetchAllFbAdAccounts}
                onSelect={selectFBAdAccount}
                title="Select an Ad Account"
                subtitle="Please select an ad account for Odaia Ads."
                loading={loading}
              />
            )}
            {fbStep === "page" && (
              <FbSelectors
                onInit={fetchAllFbPages}
                onSelect={selectFBPage}
                title="Select a page"
                subtitle="Please select a page for Odaia Ads."
                loading={loading}
              />
            )}
          </Route>
          <Route path={`${path}/initialize`} exact>
            <Initialize />
          </Route>
          <Route path={`${path}/audience`} exact>
            <Audience />
          </Route>
        </div>
      </Fade>
    </>
  );
};

export default InroContainer;
