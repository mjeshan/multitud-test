import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {grey } from '@material-ui/core/colors';
import {bold} from '../../utils/parsing'
import Bar from './bar'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',

  },
  captionPrimary:{
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    maxWidth: '100%',
  },
  captionSecondary:{
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 400,
    maxWidth: '100%',
    //marginTop: '1rem',
    marginBottom: '0.5rem',
  },
  sentence: {
    textAlign: 'left',
    wordWrap: 'break-word'
  }
}));


export default function BarGraph({graphData=null, colors=null, secondaryColor=null}){
  const classes = useStyles();
  const {graphContent, graphGroupLabels, graphColors, graphSentences} = graphData;
  const useOverrideColor = graphColors && Array.isArray(Object.keys(graphColors));
  const overrideColors = Object.values(graphColors);
 
  var graphSeries = null;
  var graphLables = null;
  if(graphData && Array.isArray(Object.values(graphContent))){
    graphSeries = Object.values(graphContent);
    graphLables = Object.keys(graphContent);
  }


  return(
    <div className={classes.root} style={{marginTop : '1rem'}}>
      {Array.isArray(graphSeries) && graphSeries[0]?
        graphSeries.map((item, i) =>
          <div className={classes.root} style={{marginBottom: '1.5rem'}} key={i}>
            <Typography variant="h1" className={classes.captionPrimary} color="textPrimary" noWrap align="left">
              {graphGroupLabels[graphLables[i]] ?  graphGroupLabels[graphLables[i]].secondaryLabel : ""}
            </Typography>
            <Typography variant="subtitle1" className={classes.captionSecondary} color="textSecondary" noWrap align="left">
              {graphGroupLabels[graphLables[i]] ?  graphGroupLabels[graphLables[i]].primaryLabel : ""}
            </Typography>
            {Array.isArray(item) ? 
              item.map((value, j) => <Bar key={j} barLength={value} color={useOverrideColor? ((overrideColors[i])[j] === "secondary"? secondaryColor: colors[j]) : colors[j]}/>)
            :null}
            <div className={classes.sentence}>
              {graphSentences ? graphSentences[graphLables[i]] ? bold(graphSentences[graphLables[i]]) : null : null}
            </div>
          </div>)
      :null}
    </div>
  )

}