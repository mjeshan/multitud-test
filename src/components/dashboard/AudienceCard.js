import React, { useCallback, useState } from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useDispatch, useSelector } from "react-redux";

import { openAdcreationPopup, createAudiences } from "../../actions/fbActions";

const AudienceCard = ({ audience }) => {
  const dispatch = useDispatch();
  const { id, type, reach, segment_id } = audience;

  const [loading, setLoading] = useState(false);

  const audienceCreationLoading = useSelector(
    (state) => state.fbCreds.audienceCreationLoading
  );
  const { accessToken, adAccountId } = useSelector((state) => state.fbCreds.fb);

  const createAudienceHandler = useCallback(() => {
    setLoading(true);
    dispatch(createAudiences(accessToken, adAccountId, type));
    setLoading(false);
  }, []);

  return (
    <div className="audience-card">
      <InfoOutlinedIcon />
      <p className="text-base mb-5 mt-5">{type}</p>
      <h3 className="text-3xl font-bold mb-5">{reach}</h3>
      <p className="text-base mb-5">Potential Reach</p>
      <button className="btn-default w-full" onClick={createAudienceHandler}>
        {loading ? "Loading..." : "Create Audience"}
      </button>
    </div>
  );
};

export default AudienceCard;
