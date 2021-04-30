import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

const InsightCard = () => {
  return (
    <>
      <div className="audience-card text-left">
        <h3 className="text-3xl font-bold mb-5">Canada</h3>
        <p className="text-base mt-5">Top Country</p>
      </div>
      <div className="audience-card text-left">
        <h3 className="text-3xl font-bold mb-5">Kitchener</h3>
        <p className="text-base mt-5">Top City</p>
      </div>
      <div className="audience-card text-left">
        <h3 className="text-3xl font-bold mb-5">57%</h3>
        <p className="text-base mt-5">Visitors Are Male</p>
      </div>
    </>
  );
};

export default InsightCard;
