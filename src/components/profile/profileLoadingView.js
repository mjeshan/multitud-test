import React from 'react';
import { makeStyles,} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import ErrorIcon from '@material-ui/icons/Error';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import Button from '@material-ui/core/Button';
import {logoutUrl} from '../../request/config';
import {ReactComponent as MultitudLogo} from '../../assets/multitudPortrait.svg';
import { trackSignInOrOut } from '../../trackers/appEventTracker';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    alignContent : 'center',
    justifyContent : 'center',
    position: 'absolute',
    top : 0,
    left : 0,
  },
  logoStyle:{
    width:'170px',
    height: 'auto',
    //'margin-left':'30px',
    marginBottom : 30,
  },
  textStyle:{
    fontSize : 13,
    fontWeight : 500,
    maxWidth : 230,
  }
}));

export default function ProfileLoadingView({isBusy, profileLoaded, clearCookie, errorMessage}){
  const classes = useStyles();

  return(
    <Grow in={true} direction="left" {...{ timeout: 700 }}>
      <div className={classes.root}>
        <MultitudLogo style={{width: '17%', height : 'auto', marginBottom : '5%'}}/>
          {!profileLoaded && isBusy ?
            <React.Fragment>
              <CircularProgress color="primary" style={{width: 30, height : 30, marginBottom: 15}}/>
              <Typography variant="subtitle1" color="textSecondary" className={classes.textStyle}>
                {"Loading Account Profile ..."}
              </Typography>
            </React.Fragment>
          :
          ( errorMessage) && !isBusy ?//!profileLoaded ||
            <React.Fragment>
              <ErrorIcon color="error" style={{width: 35, height: 35, marginBottom : 15,}} />
              <Typography variant="subtitle1" color="textSecondary" className={classes.textStyle}>
                {"Sorry, We are having trouble loading your profile. Please sign out and then sign in again."}
              </Typography>
              <Button variant="outlined" style={{marginTop : 30}} onClick={ async()=>{
                    trackSignInOrOut('sign out')
                    await clearCookie();
                    window.location.href = logoutUrl;
                  }}>
                  Sign Out
              </Button>
            </React.Fragment> : null
          }

      </div>
    </Grow>
  )
}