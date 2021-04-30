import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { grey  } from '@material-ui/core/colors';
import * as layoutStyles from '../../styles/layoutStyles';

const useStyles = makeStyles(theme => ({
  columnContainer: {...layoutStyles.columnContainerCentered,
    padding : 0,
    margin : 0,
  },
  primary:{
    fontSize : 14,
    fontWeight : 600,
    marginBottom : 0,
    fontFamily : 'Roboto',
    width : '100%',
  },
  secondary:{
    fontSize : 12,
    fontWeight : 500,
    fontFamily : 'Roboto',
    width : '100%',
    //marginBottom : 30,
  },
  tertiary:{
    fontSize : 10,
    fontWeight : 400,
    maxWidth : 100,
    fontFamily : 'Roboto',
    width : '100%',
  },

}));

export default function TriLable({primary=null, secondary=null, tertiary=null, style={}}){
  const classes = useStyles();

  return(
    <div className={classes.columnContainer} style={style}>
      {primary && primary !== "" ? 
        <Typography variant="h3" color="textPrimary" className={classes.primary} align="center">{primary}</Typography>
       : null}
      {secondary && secondary !== "" ? 
        <Typography variant="h1" color="textSecondary" className={classes.secondary} align="center">{secondary}</Typography>
      : null} 
      {tertiary && tertiary !== "" ? 
        <Typography variant="body1" className={classes.tertiary} style={{color : grey[600]}} align="center">{tertiary}</Typography>
      : null}       
    </div>
  )
}