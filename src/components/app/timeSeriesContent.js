import React, { useEffect, useState } from 'react';
import { blueGrey, red, pink, purple, deepPurple, indigo, blue, 
  lightBlue, cyan, teal, green, lightGreen, lime,
   yellow, amber, orange, deepOrange,grey  } from '@material-ui/core/colors';
import { makeStyles, } from '@material-ui/core/styles';
import SegmentSummary from '../datavisuals/segmentSummary';
import GroupPanels from '../datavisuals/groupPanels';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleContent from './toggleContent';
import SentenceSummary from '../datavisuals/sentenceSummary';
import DemographicsView from '../datavisuals/demographicsView';

const useStyles = makeStyles((theme) => ({
  loadingCircle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  timeSeriesContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '30px',
    width: '95%',
    //height: '45%',

  },
  segmentSummariesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '25px',
    width: '95%'
  },
  barGraphsContainer: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    width: '95%',
    marginBottom: '5rem',
  },
  sentenceSummaryContainer: {
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    width: '95%',
  },
  segmentSummary: {
    width: '30vw',
  },
  summaryHolder: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '30%',
    paddingLeft: '16px'
  },
  segment: {
    width: '30%'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

const secondaryGraphColor = grey[500];
const defaultColors = [ green[500],lightBlue['A400'],deepOrange['A400'], grey[500]];

export default function TimeSeriesContent(props) {
  //temporary
  const graphColors = defaultColors;
  const classes = useStyles();
  const { analysisItem, isBusy, getAnalysis, currentAnalysis, profile } = props

  useEffect(() => {
    if (analysisItem && currentAnalysis && (analysisItem.analysisId === currentAnalysis.analysisId || analysisItem === currentAnalysis)) {

    }
    else if (analysisItem && analysisItem.analysisId) {
      getAnalysis(analysisItem.analysisId);
    }
    return () => {

    };
  }, [analysisItem]);

  return (
    isBusy ?
      <Fade in={true} {...{ timeout: 1500 }} key={analysisItem ? analysisItem.analysisId + "0" : "0"}>
        <div className={classes.loadingCircle}>
          <CircularProgress />
          <Typography variant="subtitle1" style={{ marginTop: '2rem' }}>One second, coming right up ...</Typography>
        </div>
      </Fade>
      :
      currentAnalysis && currentAnalysis.metadata && currentAnalysis.metadata.analysisId ?
        <Fade in={true} {...{ timeout: 800 }} key={currentAnalysis.metadata.analysisId}>
          <div className={classes.root}>
            <div className={classes.timeSeriesContainer}>
              <ToggleContent toggleContent={currentAnalysis.timeSeriesGraphs} graphColors={graphColors} nameKey={'graphName'} toggleType={'timeseries'}/>
            </div>
            <div className={classes.segmentSummariesContainer}>
              {currentAnalysis.segmentSummaries ? currentAnalysis.segmentSummaries.map((segmentData, index) => {
                return (<div className={classes.summaryHolder} key={index}>
                  <SegmentSummary segmentInfo={segmentData} analysisId={currentAnalysis.metadata.analysisId}
                    colors={{ labelColor: graphColors[index], rangeColor: 'green' }} className={classes.segmentSummary} profile={profile}/>
                </div>);
              }) : null}
            </div>
            {currentAnalysis.sentenceSummaries ?
              <div className={classes.sentenceSummaryContainer}>
                {currentAnalysis.sentenceSummaries.map((sentences, i) => {
                  return (<div className={classes.segment} key={i}>
                      <SentenceSummary sentences={sentences} num={sentences.length} />
                    </div>);
                })}
              </div>
            : null}
            {currentAnalysis.demographics ?
              <div className={classes.sentenceSummaryContainer}>
                {currentAnalysis.demographics.map((section, i) => (
                  <div className={classes.segment} key={i}>
                    <DemographicsView content={section.content} summaryTitle={section.primaryText}/>
                  </div>
                ))}
              </div>
              : null}
             <div className={classes.barGraphsContainer}>
              {currentAnalysis.barGraphs ? currentAnalysis.barGraphs.map((barGraphs, j) => {
                return (
                  <div className={classes.segment} key={j}>
                    {barGraphs.map((graph, index) => {
                      return Object.keys(graph.graphContent).length != 0 ? 
                        <GroupPanels 
                          key={index} 
                          colors={[blue['A400']]} 
                          secondaryColor={secondaryGraphColor} 
                          groups={[graph]}
                          primaryField='graphName'
                          secondaryField='graphHighlight'/>
                      : null
                    })}
                  </div>);
              }) : null}
            </div>
          </div>
        </Fade> : null
  );
}