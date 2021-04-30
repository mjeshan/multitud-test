import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import { getFBCredentials } from "../../actions/fbActions";

const ConnectFB = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.fbCreds.loading);

  useEffect(() => {
    dispatch(getFBCredentials());
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <h2 className="text-black font-bold text-2xl mb-5">
            Connect Facebook
          </h2>
          <p className="text-black font-semibold mb-5">
            Let's connect you FB account to Multitud
          </p>
          <button className="bg-green-600 text-white rounded-sm shadow-lg py-2 px-5 mt-5">
            Connect Facebook
          </button>
        </>
      )}
    </>
  );
};

export default ConnectFB;
