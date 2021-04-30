import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";

import AdsetCard from "./AdsetCard";
import AudienceCard from "./AudienceCard";

const Campaigns = () => {
  return (
    <div className="container mx-auto max-w-screen-lg text-center py-10">
      <div className="pageTitle text-left mb-5">
        <h2 className="text-4xl font-bold">Campaigns</h2>
      </div>
      <div className="tab-title">
        <ul className="flex justify-start">
          <li>
            <NavLink to="/dashboard/campaigns" className="link" exact>
              Ads
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/campaigns/audiences" className="link">
              Audiences
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="w-full my-10">
        <Switch>
          <Route path="/dashboard/campaigns/audiences">
            <div className="w-full">
              <div className="title-container">
                <h2 className="section-title">
                  <span className="active-count">5</span> Active Audiences
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <AudienceCard />
                <AudienceCard />
                <AudienceCard />
                <AudienceCard />
                <AudienceCard />
              </div>
            </div>
          </Route>
          <Route path="/dashboard/campaigns">
            <div className="w-full">
              <div className="title-container">
                <h2 className="section-title">
                  <span className="active-count">5</span> Active Ads
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <AdsetCard />
                <AdsetCard />
                <AdsetCard />
                <AdsetCard />
                <AdsetCard />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Campaigns;
