import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
const barThickness = '0.25rem';
const barRadius = '0.125rem';

const useStyles = makeStyles((theme) => ({
  barContainer: {
    width: '100%',
    height: barThickness,
    borderRadius: barRadius,
    backgroundColor: grey[300],
    marginBottom: '0.5rem',
  },
  bar: {
    height: barThickness,
    borderRadius: barRadius,
  },
}));


export default function Bar(props) {
  const { barLength, color } = props
  const classes = useStyles();
  return (
    <div className={classes.barContainer} key={barLength + color} >
      <div
        className={classes.bar}
        style={{
          width: barLength + "%",
          backgroundColor: color
        }}>
        &nbsp;</div>
    </div>
  )
}