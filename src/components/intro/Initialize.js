import { LinearProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const createStyle = makeStyles((theme) => ({
  progressBarStyle: {
    width: "15%",
    marginTop: "2rem",
  },
}));

const Sync = () => {
  const classes = createStyle();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const intializationComplete = useSelector(
    (state) => state.app.profile.status.intializationComplete
  );

  useEffect(() => {
    let progressInterval;
    if (progress === 0) {
      progressInterval = setInterval(() => {
        setProgress((progress) => (progress < 100 ? progress + 1 : progress));
      }, 100);
    }
    if (progress >= 100) {
      console.log("cleared!");
      clearInterval(progressInterval);
    }
  }, [progress]);

  const handleNext = () => {
    dispatch({ type: "CRUNCHING_COMPLETED" });
  };
  return (
    <div className="container mx-auto text-center py-5">
      <h2 className="text-black font-bold text-2xl mb-5">
        Finishing Up Initialization
      </h2>

      <p className="text-black font-semibold mb-5">Analyzing Your Store</p>

      <div className="my-5 mx-auto">
        <div className="h-3 relative max-w-xl rounded-full overflow-hidden mx-auto">
          <div className="w-full h-full bg-gray-200 absolute"></div>
          <div
            className="h-full bg-green-600 absolute transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        {/* <LinearProgress className={classes.progressBarStyle} /> */}
      </div>

      <p className="text-black font-semibold mb-5">
        Estimated Time Remaining: 30s
      </p>

      <button
        onClick={handleNext}
        disabled={progress < 100}
        className={progress < 100 ? "btn-disabled" : "btn-default"}
      >
        Next
      </button>

      <div className="mb-10 text-center mt-16 relative">
        <p className="relative z-10 px-2 bg-gray-50 inline-block">
          Frequently Asked Questions
        </p>
        <span
          className="absolute w-full bg-gray-200 top-1/2 left-0 z-"
          style={{ height: "1px" }}
        ></span>
      </div>

      <div className="grid grid-cols-2 gap-4 my-5">
        <div className="p-10 bg-white shadow-lg text-left rounded-lg italic">
          <h3 className="font-semibold text-xl mb-3">How does ODAIA works?</h3>
          <p className="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="p-10 bg-white shadow-lg text-left rounded-lg italic">
          <h3 className="font-semibold text-xl mb-3">How does ODAIA works?</h3>
          <p className="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="p-10 bg-white shadow-lg text-left rounded-lg italic">
          <h3 className="font-semibold text-xl mb-3">How does ODAIA works?</h3>
          <p className="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="p-10 bg-white shadow-lg text-left rounded-lg italic">
          <h3 className="font-semibold text-xl mb-3">How does ODAIA works?</h3>
          <p className="text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sync;
