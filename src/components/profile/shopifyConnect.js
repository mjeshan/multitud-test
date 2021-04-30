import React, { useEffect } from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {grey} from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Circle from 'react-circle';
import Fade from '@material-ui/core/Fade';
import {ReactComponent as MultitudSplash} from '../../assets/multitudSplash.svg';
import {ReactComponent as MultitudLogo} from '../../assets/multitud.svg';
import {ReactComponent as ConnectButton} from '../../assets/connectButton.svg';
import * as layoutStyles from '../../styles/layoutStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

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
    flexGrow : 1,
  },
  textPrimaryStyle:{
    fontSize : 32,
    fontWeight : 600,
    //maxWidth : 230,
  },
  textSecondaryStyle:{
    fontSize : 16,
    fontWeight : 400,
    maxWidth : '26rem',
  },
  progressBarStyle:{
    width : '15%',
    marginTop : '2rem',
  },
  buttonStyle:{
    width: '20%',
    height : 'auto',
    minWidth: '12rem',
    maxWidth: '50rem',
    '&:hover':{
      cursor: 'pointer',
      backgroundColor: theme.palette.action.hover,
    }
  },
}));


var progressUpdate = null;

export default function ShopifyConnectView({isBusy, profile, startInitialization, errorMessage, incrementInit, updateProfile}){
  const classes = useStyles();
  const {intializationComplete, intializationProgress, intializationProgressDescription} = profile.status;


  useEffect(() => {
    if (intializationComplete){
      if(progressUpdate){
        console.log("############## stoping thread");
        clearInterval(progressUpdate);
        progressUpdate = null;
      }
    }else{
      if(intializationProgress !== null && progressUpdate === null){
        console.log("++++++++++++++ Start Thread ");
        progressUpdate = setInterval(()=>{
          console.log("=========> Running ");
          updateProfile();

        }, 15000)
      }
    }
    return () => {

      if(progressUpdate){
        console.log("~~~~~~~~~~~~ stoping thread");
        clearInterval(progressUpdate);
        progressUpdate = null;
      }
    };
  }, [intializationComplete]);

  console.log("lazer!")

  return(
    <Fade in={true} {...{ timeout: 1200 }} key={profile.userId} >
      <div className={classes.columnStyle}>
        <div className={classes.rowStyle}>
          <MultitudLogo style={{width: '7%', height : 'auto', margin : '1rem'}}/>
        </div>
        <div className={classes.root}>
            {!intializationComplete && intializationProgress === null ?
              <React.Fragment>
                <MultitudSplash style={{width: '17%', height : 'auto', minWidth: '14rem'}}/>
                <Typography variant="h1" color="textPrimary" className={classes.textPrimaryStyle} style={{marginTop: '5rem', marginBottom: '1rem'}}>
                  {"Kudos " + ((profile.organization && profile.organization.organizationName)? profile.organization.organizationName:"") + "!"}
                </Typography>
                <Typography variant="body1" color="textSecondary" className={classes.textSecondaryStyle} style={{marginBottom: '2rem'}}>
                  {"You are just one step away from unlocking the power of advanced customer insights! When you are ready, simply connect your Shopify data. Then sit back, relax, and let us go crunch some data ..."}
                </Typography>
                  {isBusy?
                    <CircularProgress color="primary" style={{width: 30, height : 30, marginBottom: 15}}/>
                    :<ConnectButton className={classes.buttonStyle} onClick={()=>{
                      console.log("***************  START INIT");
                      startInitialization();

                    }}/>}

              </React.Fragment>
            :

              <React.Fragment>
                {/*<Circle
                  animate={true} // Boolean: Animated/Static progress
                  animationDuration="2s" // String: Length of animation
                  responsive={false} // Boolean: Make SVG adapt to parent size
                  size={'20rem'} // String: Defines the size of the circle.
                  lineWidth={'2rem'} // String: Defines the thickness of the circle's stroke.
                  progress= {intializationProgress} // String: Update to change the progress and percentage.
                  progressColor={'#0887ff'} // String: Color of "progress" portion of circle.
                  bgColor={grey[300]} // String: Color of "empty" portion of circle.
                  textColor={grey[400]} // String: Color of percentage text color.
                  textStyle={{
                    font: '4rem Roboto, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
                  }}
                  percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
                  roundedStroke={true} // Boolean: Rounded/Flat line ends
                  showPercentage={true} // Boolean: Show/hide percentage.
                  showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
                  style={{margin : 0, padding : 0}}
                />*/}
                <Typography variant="h1" color="textPrimary" className={classes.textPrimaryStyle} style={{marginTop: '5rem', marginBottom: '1rem'}}>
                  {"Hang on, We're Crunching..."}
                </Typography>
                <Typography variant="body1" color="textSecondary" className={classes.textSecondaryStyle}>
                  {/*intializationProgressDescription*/}
                  {"This will take 1 - 2 hours, please check again later. Thank you for your patience, and we promise it’ll be worth it! If the computer is working this hard, imagine doing it yourself :)"}
                </Typography>
                <LinearProgress className={classes.progressBarStyle}/>
              </React.Fragment>
            }

        </div>
      </div>
    </Fade>
  )
}