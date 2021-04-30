import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SegmentThumb from '../generic/segmentThumb';
import Legend from './legend';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  comparePanel:{
    width : '100%',
    height : 'auto',
    display : 'flex',
    alignItems : 'center',
    flexWrap : 'wrap',
    justifyContent : 'center',
  },
  captionPrimary:{
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 500,
    marginTop: '3rem',
  },
  captionSecondary:{
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 400,
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  versus:{
    fontFamily : 'Roboto',
    fontSize : 24,
    fontWeight : 500,
    margin : '1rem',
    width : 'auto',
  },
  description:{
    fontSize: 18,
    fontWeight: 400,
    marginTop: '3rem',
    marginBottom: '0.5rem',
    marginLeft: '0.5rem',
  },
}));
 
export default function SegmentMeta({comparisons=null, comparisonColors=null, description="", legends=null, legendColors=null, segmentName=""}){
  const classes = useStyles();


  return(
    <div className={classes.root}>
      {Array.isArray(comparisons) && comparisons[0]? 

        <div className={classes.comparePanel}>
          {comparisons.map((item, i) => 

              <React.Fragment key={i+"frag"}>
                <Fade in={true} {...{ timeout: 1000 + i* 200}} key={segmentName + i}>
                 
                  <SegmentThumb 
                    initial={item.initial}
                    initialBackgroundColor={comparisonColors[i]}
                    primaryLabel={item.primaryLabel}
                    secondaryLabel={item.secondaryLabel}
                    tertiaryLabel={item.tertiaryLabel}
                    key={segmentName}
                    />
                  </Fade>
                  {i < comparisons.length - 1 ?
                    <Fade in={true} {...{ timeout: 1000 + i* 200}} key={segmentName + "vs" + i}>
                      <Typography className={classes.versus} variant="h2" color="textSecondary">
                        VS
                      </Typography>
                    </Fade>
                    :null}
              </React.Fragment>)}
        </div>
      :null}
      <Typography className={classes.description} variant="body1" color="textSecondary" align="left">{description}</Typography>
      {Array.isArray(legends) && legends[0]?
        legends.map((item,i) =>         
          <Legend 
            color={Array.isArray(legendColors) && legendColors[i] ? legendColors[i] : "#333333"} 
            label={item}
            style={{padding : '0.25rem'}}
            key={"legend" + i}
            />)
      :null}
    </div>)
}