import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { blueGrey, red, pink, purple, deepPurple, indigo, blue, 
  lightBlue, cyan, teal, green, lightGreen, lime,
   yellow, amber, orange, deepOrange,grey  } from '@material-ui/core/colors';
import Circle from 'react-circle';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  tileContainer: {
    height: 'auto',
    width: 'auto',
    display: 'flex',
    'flex-direction': 'Column',
    'flex-wrap' : 'nowrap',
    'align-items' : 'center',
    'justify-content' : 'center',
    'align-content' : 'center',
    marginLeft : '25px',
    marginRight : '25px',
  },
  tileTinyContainer: {
    height: 'auto',
    width: 'auto',
    display: 'flex',
    'flex-direction': 'Column',
    'flex-wrap' : 'nowrap',
    'align-items' : 'center',
    'justify-content' : 'center',
    'align-content' : 'center',
    marginLeft : '5px',
    marginRight : '5px',
  },
  rowContainer: {
    height: 'auto',
    width: 'auto',
    display: 'flex',
    'flex-direction': 'Row',
    'flex-wrap' : 'nowrap',
    'align-items' : 'center',
    'marginLeft' : 10,
    //'justify-content' : 'center',
    //'align-content' : 'center',

  },
  titleNumber:{
    'fontSize' : 32,
    color : theme.palette.text.primary,
    width : 'auto',
    marginTop : 25,
    'fontWeight':'bold',
  },
  titleNumberSmall:{
    'fontSize' : 20,
    color : theme.palette.text.primary,
    width : 'auto',
    marginTop : 15,
    'fontWeight':'bold',
  },
  title:{
    'fontSize' : 13,
    color : theme.palette.text.secondary,
    width : 'auto',
    marginTop : 25,
  },  
  subNumber:{
    'fontSize' : 32,
    color : theme.palette.text.primary,
    width : 'auto',
    marginTop : 5,
    'fontWeight':'bold',
  },
  subNumberSmall:{
    'fontSize' : 20,
    color : theme.palette.text.primary,
    width : 'auto',
    marginTop : 3,
    'fontWeight':'bold',
  },
  subtitle:{
    'fontSize' : 13,

    color : theme.palette.text.secondary,
    width : 'auto',
    //marginTop : 3,
  },  
  divierStyle:{
    height: 2,
    width: '90%',
    background: theme.palette.background.paper,
    marginTop : 3,
    marginBottom : 3,
  },
}));

export default function PercentTile({percentage, titleNumber, title, subNumber, subTitle, colorOverride, animateOrder, small=false, bottomMargin=0, tiny=false}){
  const classes = useStyles();
  const [animate, setAnimate] = useState(false);


  return(
    <div>
      <Fade in={true} {...{ timeout: 1500 + animateOrder *700 }}>
        <div className={tiny? classes.tileTinyContainer : classes.tileContainer} style={{marginBottom : bottomMargin}}>
          <Circle
            animate={true} // Boolean: Animated/Static progress
            animationDuration="5s" // String: Length of animation
            responsive={false} // Boolean: Make SVG adapt to parent size
            size={tiny? "20" : small ? "110" : "180"} // String: Defines the size of the circle.
            lineWidth={tiny? "35" : small ? "15": "25"} // String: Defines the thickness of the circle's stroke.
            progress= {percentage} // String: Update to change the progress and percentage.
            progressColor={colorOverride? colorOverride : tiny? pink[500] : blue["A400"]} // String: Color of "progress" portion of circle.
            bgColor={tiny? grey[700] :"#000000"} // String: Color of "empty" portion of circle.
            textColor={grey[400]} // String: Color of percentage text color.
            textStyle={{
              font: 'bold 4rem Helvetica, Arial, sans-serif' // CSSProperties: Custom styling for percentage.
            }}
            percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
            roundedStroke={true} // Boolean: Rounded/Flat line ends
            showPercentage={!tiny} // Boolean: Show/hide percentage.
            showPercentageSymbol={!tiny} // Boolean: Show/hide only the "%" symbol.
          />
          {tiny? 
            null
          :
            <React.Fragment>
              <div className={classes.rowContainer}>
              <Typography className={small ? classes.titleNumberSmall: classes.titleNumber} variant="h6" >{titleNumber}</Typography>
              <Typography className={classes.title} variant="subtitle1" style={{maxWidth:60, marginLeft:5}} align='left' >{title}</Typography>
              </div>
              <div className={classes.divierStyle}/>
              <div className={classes.rowContainer}>
                <Typography className={small ? classes.subNumberSmall : classes.subNumber} variant="h6" >{subNumber}</Typography>
                <Typography className={classes.subtitle} variant="subtitle1" style={{maxWidth:60, marginLeft:5}} align='left'>{subTitle}</Typography>
              </div>
            </React.Fragment>
          }
        </div>
      </Fade>
    </div>
  );

}