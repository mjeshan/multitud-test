import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey, red, pink, purple, deepPurple, indigo, blue, 
  lightBlue, cyan, teal, green, lightGreen, lime,
   yellow, amber, orange, deepOrange,grey  } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import * as layoutStyles from '../../styles/layoutStyles';

const useStyles = makeStyles(theme => ({
  customLabelContainer:{
    borderRadius : 3,
    padding: 6,
    paddingTop : 2,
    paddingBottom : 2,
    width : 'auto',
    height : 'auto',
   // borderStyle : 'solid',
   // backgroundColor : blue[700],"#FFFFFFE0"
  },
  sublabelText:{
    fontSize : 11,
    fontWeight : 500,
    width : 'auto',

  },
  labelText:{
    fontSize : 12,
    fontWeight : 600,
    width : 'auto',

  }, 
}));

export default function RectChip({label, subLabel=false, backgroundColor=blue['A400'], color="#FFFFFF", style={}, align='center'}){
  const classes = useStyles();
  return(
    <div style={{display : 'flex', marginBottom: subLabel? 10 : 3, ...style}}>
      <div  className={classes.customLabelContainer} 
            style={{backgroundColor : subLabel? grey[700] : backgroundColor,borderWidth : 0}}>
        <Typography variant="subtitle2" 
                    color="textSecondary" 
                    className={subLabel ?classes.sublabelText : classes.labelText} 
                    style={subLabel? {} : {color:color}}
                    align={align}>
          {label}
        </Typography>
      </div>
    </div>
  )

}