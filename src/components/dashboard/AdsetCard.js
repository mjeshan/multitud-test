import React from "react";
import demo from "../../assets/demo.png";
import ads1 from "../../assets/adsDemo/ads1.png";
import ads2 from "../../assets/adsDemo/ads2.png";
import ads3 from "../../assets/adsDemo/ads3.png";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

const AdsetCard = () => {
  return (
    <>
      <div className="audience-card adset-card text-left">
        <div className="title-container flex">
          <h3 className="title">Reward Incentive Ad</h3>
          <MoreVertOutlinedIcon className="justify-self-end" />
        </div>
        <div className="image-container">
          <img src={ads2} />
        </div>
        <div className="benchmarks">
          <div className="text-center">
            <p className="text-2xl font-bold">$120</p>
            <p className="text-base">Total Cost</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">$120</p>
            <p className="text-base">Total Cost</p>
          </div>
        </div>
        <div className="ad-audience mb-10">
          <p className="text-base font-bold">Target Audiences</p>
          <ul>
            <li>
              <CheckOutlinedIcon className="tick" /> Loyalists
            </li>
            <li>
              <CheckOutlinedIcon className="tick" /> Frequent Visitors
            </li>
          </ul>
        </div>
        <div className="btn-container w-full">
          <button className="btn-outlined btn-full mb-5">Edit Audiences</button>
          <button className="btn-default btn-full">Edit Audiences</button>
        </div>
      </div>
    </>
  );
};

export default AdsetCard;
