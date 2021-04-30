import React  from 'react';
import { makeStyles,  } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import {logoutUrl} from '../../request/config';
import {ReactComponent as MultitudLogo} from '../../assets/multitud.svg';
import * as layoutStyles from '../../styles/layoutStyles';
import { trackPrivacyAgreement } from '../../trackers/appEventTracker';


const useStyles = makeStyles(theme => ({
  columnStyle: {...layoutStyles.columnContainerLeftAligned},
  rowStyle : {...layoutStyles.rowContainerLeftAligned, height: '6%',},
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
  titleStyle:{
    fontSize : 32,
    fontWeight : 600,
    marginBottom : '1.5%',
    //maxWidth : 230,
  },
  textBox:{
    width: '50%',
    maxHeight: '50%',
    borderWidth: 1,
    borderColor: theme.palette.divider,
    borderRadius : 3,
    borderStyle : 'solid',
    color : theme.palette.text.secondary,
    fontSize : 12,
    fontWeight : 400,
    marginBottom : '5%',
    overflowX : 'hidden',
    overflowY : 'auto',
    padding : '0.75rem',
    align : 'left',
    textAlign : 'left',
  },
  buttonStyle:{
    width : '20%',
    height : 'auto',
    marginTop :'0.5rem',
    padding : '0.75rem',
    maxWidth : '25rem',
  },
  busy:{
    width : '10%',
    height : 'auto',

  },
}));

export default function EULAView({isBusy, profile, clearCookie, signEula, eula}){
  const classes = useStyles();

  return(
    <Fade in={true} {...{ timeout: 700 }}>
      <div className={classes.columnStyle}>
        <div className={classes.rowStyle}>
          <MultitudLogo style={{width: '7%', height : 'auto', margin : '1rem'}}/>
        </div>
        <div className={classes.root}>
          {eula !== null ?
          <React.Fragment>
          <Typography variant="h1" color="textPrimary" className={classes.titleStyle}>
            {eula.title}
          </Typography>
          <div className={classes.textBox}>
            {eula.content}
          </div>
          </React.Fragment> :null }
          {isBusy && eula !== null ? 
            <CircularProgress className={classes.busy} color="primary"/>

            :<React.Fragment>
              <Button variant="contained" color="secondary" disableElevation className={classes.buttonStyle} style={{color : '#000000'}} onClick={()=>{
                trackPrivacyAgreement('agree')
                signEula(profile.userId, profile)
              }}>
                  Agree
              </Button>
              <Button variant="outlined" className={classes.buttonStyle} onClick={ async()=>{
                    trackPrivacyAgreement('disagree')
                    await clearCookie();
                    window.location.href = logoutUrl;
                  }}>
                  Disagree
              </Button>
            </React.Fragment>}

            

        </div>
      </div>

    </Fade>
  )
}