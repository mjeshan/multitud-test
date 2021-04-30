import React from "react";
import { useSelector } from "react-redux";

const Steps = () => {
  const steps = useSelector((state) => state.fbCreds.intro_step);
  return (
    <div className="container mx-auto px-4 text-center">
      <div className="py-5 flex justify-between border-t-2 border-b-2">
        <div className="text-center flex flex-col items-center">
          <span className={steps >= 1 ? "steps-active" : "steps"}>1</span>
          <span className={steps >= 1 ? "" : "text-gray-300"}>
            Integrate Facebook
          </span>
        </div>
        <div className="text-center flex flex-col items-center">
          <span className={steps >= 2 ? "steps-active" : "steps"}>2</span>
          <span className={steps >= 2 ? "" : "text-gray-300"}>
            Finish Initialization
          </span>
        </div>
        <div className="text-center flex flex-col items-center">
          <span className={steps >= 3 ? "steps-active" : "steps"}>3</span>
          <span className={steps >= 3 ? "" : "text-gray-300"}>
            Set Initital Audience
          </span>
        </div>
      </div>
    </div>
  );
};

export default Steps;
