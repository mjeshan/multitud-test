import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const Audience = () => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const skip = () => {
    dispatch({ type: "INTRO_COMPLETED" });
  };

  return (
    <>
      <div className="container mx-auto text-center py-5">
        <h2 className="text-black font-bold text-2xl mb-5">
          The Following Audience Has Been Created Based On Your Insights
        </h2>
        <p className="text-black font-semibold mb-5">
          Select one or more audience(s) to create your first campaign. <br />
          We suggest choosing a unique creative for each unique audiences.
        </p>
        <button className="btn-default mx-1">Create Campaign</button>
        <button className="btn-disabled mx-1" onClick={skip}>
          Skip this step
        </button>
      </div>

      <div className="container mx-auto max-w-3xl">
        <div className="my-10 grid grid-cols-3 gap-4">
          <div className="audience-card-active">
            <p className="text-sm mb-4">Frequent Visitor</p>
            <h3 className="text-3xl font-bold mb-4">43.5k</h3>
            <p className="text-sm mb-4">Potential Reach</p>
            <div className="w-5 h-5 border-green-600 bg-green-600 border-2 p-1 rounded-md mx-auto"></div>
          </div>
          <div className="audience-card">
            <p className="text-sm mb-4">Frequent Visitor</p>
            <h3 className="text-3xl font-bold mb-4">43.5k</h3>
            <p className="text-sm mb-4">Potential Reach</p>
            <div className="w-5 h-5 border-gray-600 border-2 p-1 rounded-md mx-auto"></div>
          </div>
          <div className="audience-card">
            <p className="text-sm mb-4">Frequent Visitor</p>
            <h3 className="text-3xl font-bold mb-4">43.5k</h3>
            <p className="text-sm mb-4">Potential Reach</p>
            <div className="w-5 h-5 border-gray-600 border-2 p-1 rounded-md mx-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Audience;
