import React from 'react';
import { makeStyles,} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionPrimary:{
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
  },
  legend:{
    width : '1rem',
    height : '1rem',
    display : 'flex',
    borderRadius: '0.5rem',
    marginLeft : '0.5rem',
    marginRight : '1rem',
  }, 
}));

export default function Legend({color=null, label="", style={}}){
  const classes = useStyles();

  return(
    <div className={classes.root} style={style}>
      <div className={classes.legend} style={{backgroundColor : color}}/>
      <Typography variant="subtitle2" color="textPrimary" className={classes.captionPrimary}>
        {label}
      </Typography>
    </div>)

}