import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { blueGrey, red, pink, purple, deepPurple, indigo, blue, 
  lightBlue, cyan, teal, green, lightGreen, lime,
   yellow, amber, orange, deepOrange,grey  } from '@material-ui/core/colors';
import Circle from 'react-circle';
import Fade from '@material-ui/core/Fade';
import * as layoutStyles from '../../styles/layoutStyles';

const useStyles = makeStyles(theme => ({
  rowContainer : {...layoutStyles.rowContainerNoWrap,
    padding : 0,
    margin:0,
    alignItems : "center",
    height : 'auto',
    width : 'auto',
  },
  columnContainer: {...layoutStyles.columnContainerLeftAligned,
    margin : 0,
    padding : 0,

  },
  label:{
    fontSize : 14,
    fontWeight : 500,
    marginLeft : 15,
    maxWidth : 100,
  },
}));

export default function PercentMetric({percentage, label=null, color=blue['A400'], size=75, lineWidth=30, style={}}){
  const classes = useStyles();


  return(

    <div className={classes.rowContainer} style={{margin : 0, ...style }}>
      <Circle
        animate={true} // Boolean: Animated/Static progress
        animationDuration="2s" // String: Length of animation
        responsive={false} // Boolean: Make SVG adapt to parent size
        size={size} // String: Defines the size of the circle.
        lineWidth={lineWidth} // String: Defines the thickness of the circle's stroke.
        progress= {percentage} // String: Update to change the progress and percentage.
        progressColor={color} // String: Color of "progress" portion of circle.
        bgColor={grey[700]} // String: Color of "empty" portion of circle.
        textColor={grey[300]} // String: Color of percentage text color.
        textStyle={{
          font: 'bold 4rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
        }}
        percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
        roundedStroke={true} // Boolean: Rounded/Flat line ends
        showPercentage={true} // Boolean: Show/hide percentage.
        showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
        style={{margin : 0, padding : 0}}
      />
      {label && label!=="" ?
        <Typography variant="body2" color="textSecondary" align="left" className={classes.label} >
          {label}
        </Typography>
      :null}
    </div>

  );

}