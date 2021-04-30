import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AudienceCard from "./AudienceCard";
import InsightCard from "./InsightCard";
import AdsetCard from "./AdsetCard";

import { fetchAudiences, createAudiences } from "../../actions/fbActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const audiences = useSelector((state) => state.fbCreds.audiences);

  useEffect(() => {
    dispatch(fetchAudiences());
  }, []);

  return (
    <div className="container mx-auto max-w-screen-lg text-center py-10">
      <div class="grid grid-cols-3 gap-5 divide-x">
        <div class="col-span-2">
          <div className="w-full">
            <div className="title-container w-full">
              <h2 className="section-title">Don't Miss This Audiences</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {audiences.map((a) => (
                <AudienceCard key={a.id} audience={a} />
              ))}
            </div>
          </div>

          <div className="separator"></div>

          <div className="w-full">
            <div className="title-container">
              <h2 className="section-title">
                <span className="active-count">3</span> Active Ads
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <AdsetCard />
              <AdsetCard />
            </div>
          </div>
        </div>
        <div class="px-5">
          <div className="title-container">
            <h2 className="section-title">Top Daily Insights</h2>
          </div>
          <div className="grid grid-col-1 gap-5">
            <InsightCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
