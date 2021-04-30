import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { closeAdcreationPopup } from "../../actions/fbActions";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const AudienceSnackBar = () => {
  const dispatch = useDispatch();
  const audienceDialogOpen = useSelector(
    (state) => state.fbCreds.audienceDialogOpen
  );

  const createUserCount = useSelector((state) => state.fbCreds.createUserCount);

  const handleClose = useCallback(() => {
    dispatch(closeAdcreationPopup());
  }, []);

  return (
    <Snackbar
      open={audienceDialogOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity="success" elevation={6} variant="filled">
        {createUserCount} audiences created!
      </Alert>
    </Snackbar>
  );
};

export default AudienceSnackBar;
