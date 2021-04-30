import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import TriLable from './triLabel';

const useStyles = makeStyles(theme => ({
  columnContainer: {
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    width : 'auto',
    height : 'auto',
  },
  avatarStyle:{
    color : '#ffffff',
    //width : '65%',
    //height : '65%',
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginBottom : '1.5rem',
  },

}));


export default function SegmentThumb({initial="", 
                                      initialBackgroundColor=grey[700], 
                                      primaryLabel="", 
                                      secondaryLabel="", 
                                      tertiaryLabel="",
                                      style={maxWidth : '8rem', marginTop: '1rem', marginBottom: '1rem'}}){
  const classes = useStyles();

  return(
    <div className={classes.columnContainer} style={style}>
      <Avatar 
        className={classes.avatarStyle} 
        style={{backgroundColor : initialBackgroundColor}}>
          {initial}
      </Avatar>
      <TriLable 
        primary={primaryLabel}
        secondary={secondaryLabel}
        tertiary={tertiaryLabel}/>

    </div>
  );
}