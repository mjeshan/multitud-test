import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';  
import SectionHeader from '../generic/sectionHeader';
import * as layoutStyles from '../../styles/layoutStyles';  
import Avatar from '@material-ui/core/Avatar';
import ErrorIcon from '@material-ui/icons/Error';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';

import { blueGrey, red, pink, purple, deepPurple, indigo, blue, 
  lightBlue, cyan, teal, green, lightGreen, lime,
   yellow, amber, orange, deepOrange,grey  } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  rowContainerWrapped : layoutStyles.rowContainerWrapped,
  columnContainerLeftAligned : layoutStyles.columnContainerLeftAligned,
  iconContainer : {
    width : 100,
    height : '100%',
  },
  iconStyle:{
    marginTop : 10,
    marginBottom : 10,
    width :  80,
    height : 80,
    marginLeft : 25,
  },
  dismissStyle:{
    width :  40,
    height : 40,
  },
  title:{
    fontSize : 16,
    marginTop : 15,
    fontWeight : 500,
  },
  subtitle:{
    fontSize : 13,
    marginTop : 10,
    fontWeight : 450,
  },
  errorCode:{
    fontSize : 11,
    marginTop : 0,
  },  
  spacer:{
    flexGrow : 1,
  }
}));

export default function ErrorMessage({errorCode, errorType, errorTitle, errorMessage, setShow}){
  const classes = useStyles();

  return(
    errorCode && errorType && errorTitle && errorMessage?
    <Grow in={true} {...{ timeout: 700 }}>
      <div className={classes.rowContainerWrapped} style={{backgroundColor : amber[900], marginTop:  25, width : '85%', marginLeft : 50,}}>
        <div className={classes.columnContainerLeftAligned} style={{width: 100}}>
          <div className={classes.spacer}/>
          <ErrorIcon className={classes.iconStyle}/>
          <div className={classes.spacer}/>
        </div>
        <div className={classes.columnContainerLeftAligned} style={{width : 'auto', flexGrow : 1, marginLeft : 20,}}>
          <Typography variant="h1" color="textPrimary" className={classes.title}>
            {errorTitle}
          </Typography>
          <Typography variant="subtitle2" color="textPrimary" className={classes.subtitle}>
            {errorMessage}
          </Typography>   
          <Typography variant="subtitle2" color="textSecondary" className={classes.errorCode}>
            {"Error Type: " + errorType}
          </Typography>   
        </div>
        <div className={classes.columnContainerLeftAligned} style={{width: 'auto', marginRight : 20}}>
          <div className={classes.spacer}/>
          <IconButton aria-label="dismiss">
            <CancelIcon className={classes.dismissStyle} onClick={()=>{
              setShow(false);
            }}/>
          </IconButton>
          <div className={classes.spacer}/>
        </div>
      </div>
    </Grow>

    : null
  )

}