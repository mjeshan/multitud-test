import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


const AxisSlider = withStyles({
  thumb: {
    height: 0,
    width: 0,
    backgroundColor: '#ffffff00',

  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

  },
}));

export default function SimpleAxis({min=0, max=100, unit='%', additionalMarkers=1,}){
  const classes = useStyles();
  const step = parseInt((max - min) / (1+ additionalMarkers));
  var marks = [];
  var i = 0;

  for(i = min; i <= max; i+=step){
    marks.push({
      value : i,
      label: i + unit,
    })
  }
  


  return(
    <div className={classes.root}>
      <AxisSlider 
        defaultValue={0}
        getAriaValueText={value => value + unit}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={step}
        marks={marks}
        disabled
        
        min={min}
        max={100}/>
    </div>
  )
}