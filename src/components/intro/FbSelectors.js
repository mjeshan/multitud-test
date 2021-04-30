import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress, Fade } from "@material-ui/core";

import SelectorCard from "./SelectorCard";

const FbSelectors = ({ onInit, onSelect, title, subtitle, loading }) => {
  const dispatch = useDispatch();
  const listData = useSelector((state) => state.fbCreds.listData);
  const accessToken = useSelector((state) => state.fbCreds.fb.accessToken);
  const businessId = useSelector((state) => state.fbCreds.fb.businessId);

  useEffect(() => {
    console.log(accessToken, businessId);
    dispatch(onInit(accessToken, businessId));
  }, [onInit, accessToken, businessId]);

  const handleSelect = useCallback(
    (e) => {
      const id = e.currentTarget.dataset.id;
      const selectedItem = listData.data.find((b) => b.id === id);
      dispatch(onSelect(selectedItem));
    },
    [listData, onSelect]
  );

  return (
    <>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <>
          <h2 className="text-black font-bold text-2xl mb-5">{title}</h2>
          <p className="text-black font-semibold mb-5">{subtitle}</p>

          {listData &&
            listData.data.map((b) => (
              <SelectorCard
                id={b.id}
                name={b.name}
                click={handleSelect}
                key={b.id}
              />
            ))}
        </>
      )}
    </>
  );
};

export default FbSelectors;
