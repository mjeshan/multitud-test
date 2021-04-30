import React,  {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import PieChart from '../datavisuals/pieChart';
import {  red, purple, blue, blueGrey,
  lightBlue, teal, green, deepOrange,grey } from '@material-ui/core/colors';

import SegmentMeta from '../datavisuals/segmenMeta';
import GroupPanels from '../datavisuals/groupPanels';
import SentenceSummary from '../datavisuals/sentenceSummary';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    alignContent : 'center',
    justifyContent : 'center',
    position: 'absolute',
    top : 0,
    left : 0,
    flexGrow : 1,
  },
  split:{
    display : 'flex',
    flexDirection: 'row',
  },
  leftPanel:{
    marginTop: '100px', // i'm cheating this in to fit my screen


    width : '100%',
    height : '100%',
    minWidth: '25rem',
    minHeight: '30rem',
    display : 'flex',
    flexDirection : 'column',
    alignItems : 'center',
    alignContent : 'center',
    justifyContent : 'center',
  }, 
  rightPanel:{
    width: '40%',
    height: '100%',
    minWidth: '30rem',
    overflowX : 'hidden',
    overflowY : 'scroll',
  //  padding : '0.75rem',
    align : 'center',
    textAlign : 'center',
    padding : '2rem',
    margin : 0,
    borderLeftStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.divider,
  },
  scrollablePanel:{
    width:'100%',
    flex: 1,
    overflowY: 'auto',
    boxSizing: 'border-box',
    marginTop: '2rem',
  },

}));

const secondaryGraphColor = grey[500];
const secondaryGraphColorLight = grey[300];
const colorMap ={ 
  'INTERNAL_UNSUPERVISED' : ['#3a8af6', '#5fe09a', '#f5b538', '#ef5663', '#745bcc', teal[400], red[400], purple[400], green[400], deepOrange[400]],
  'EXTERNAL_UNSUPERVISED' : ['#0887ff', secondaryGraphColor],
  'INTERNAL_SUPERVISED' : [lightBlue[400], blue[700], blue[900]],
  'UNSUPERVISED_LEGEND' : ['#0887ff', secondaryGraphColor],
};
//#ffab40



export default function PieContent(props){
  const {analysisItem, navBarHeight, isBusy, getAnalysis, currentAnalysis} = props;
  const classes = useStyles();
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [segmentContentObj, setSegmentContentObj] = useState(null);
  const [segmentName, setSegmentName]=useState("");

  const getCompareColors = segmentType => {
    switch(segmentType){
      case 'INTERNAL_UNSUPERVISED':
  
        return [(colorMap[segmentType])[segmentIndex], secondaryGraphColor];
      case 'EXTERNAL_UNSUPERVISED':
      case 'INTERNAL_SUPERVISED':
      default:
        return colorMap[segmentType];
  
    }
  }
  const getPieColors = segmentType=>{
    switch(segmentType){
      case 'INTERNAL_UNSUPERVISED':
      case 'INTERNAL_SUPERVISED':
      default:
        return colorMap[segmentType];
      
      case 'EXTERNAL_UNSUPERVISED':
        return [colorMap[segmentType][0], blue[100]];
    }
  };
  
  const getLegendColors = segmentType => {
    switch(segmentType){
      case 'INTERNAL_UNSUPERVISED':
      case 'EXTERNAL_UNSUPERVISED':
      default:
        return colorMap['UNSUPERVISED_LEGEND'];
      
      case 'INTERNAL_SUPERVISED':
        return colorMap[segmentType];
    }
  ;}

  useEffect(() => {

    if(analysisItem && currentAnalysis && (analysisItem.analysisId === currentAnalysis.analysisId || analysisItem === currentAnalysis)){

    }
    else if(analysisItem && analysisItem.analysisId){
      getAnalysis(analysisItem.analysisId);  
    }
    return () => {

    };
  }, [analysisItem]);

  const onSegmentSelect = index => {
    setSegmentIndex(index);

    if(currentAnalysis.pieGraphs[0].graphContentObjects && 
      Array.isArray(Object.values(currentAnalysis.pieGraphs[0].graphContentObjects)) &&
      Object.values(currentAnalysis.pieGraphs[0].graphContentObjects)[index]){
        setSegmentContentObj(Object.values(currentAnalysis.pieGraphs[0].graphContentObjects)[index])
      }else{
        setSegmentContentObj(null);
      }

      setSegmentName((Object.keys(currentAnalysis.pieGraphs[0].graphContent))[index]);
  };

  const hasPie = ()=> Array.isArray(currentAnalysis.pieGraphs) && currentAnalysis.pieGraphs.length > 0 && currentAnalysis.pieGraphs[0];
  const hasSegment = ()=> hasPie() && segmentContentObj && Array.isArray(segmentContentObj.barGraphs) && segmentContentObj.barGraphs[0];
  return(
    isBusy? 
      <Fade in={true} {...{ timeout: 1500 }} key={analysisItem? analysisItem.analysisId+"0" : "0"}>
        <div className={classes.root}>
          <CircularProgress />
          <Typography variant="subtitle1" style={{marginTop : '2rem'}}>One second, coming right up ...</Typography>
        </div>
      </Fade>
    :
    currentAnalysis && currentAnalysis.metadata && currentAnalysis.metadata.analysisId ?
    <Fade in={true} {...{ timeout: 800 }} key={currentAnalysis.metadata.analysisId}>

        <div className={classes.split} style={{height : 'calc(100vh - ' + navBarHeight + ')',}}>
          <div className={classes.leftPanel}>
            {hasPie() ?
              <PieChart 
                onSegmentSelect={onSegmentSelect}
                graphData={Object.values(currentAnalysis.pieGraphs[0].graphContent)}
                graphLabels={Object.keys(currentAnalysis.pieGraphs[0].graphContent)}
                colors={getPieColors(currentAnalysis.metadata.analysisCategory)}
                primaryCaption={currentAnalysis.pieGraphs[0].graphName}
                secondaryCaption={currentAnalysis.pieGraphs[0].graphHighlight}
                selectable={currentAnalysis.metadata.analysisCategory === 'INTERNAL_UNSUPERVISED'}
                />
              :null}

          </div>
          
          <div className={classes.rightPanel}>
              <div style={{width : '100%'}}>
                {hasPie() && hasSegment() ?
                  <SegmentMeta 
                    comparisons={segmentContentObj.contentMeta}
                    comparisonColors={getCompareColors(currentAnalysis.metadata.analysisCategory)}
                    description={segmentContentObj.barGraphs[0].graphSummary}
                    legends={segmentContentObj.barGraphs[0].graphLabels}
                    legendColors={getLegendColors(currentAnalysis.metadata.analysisCategory)}
                    segmentName={segmentName}
                  />
                :null}
              </div>
              <div className={classes.scrollablePanel}>
                {hasPie() && hasSegment() ? 
                  segmentContentObj.sentenceSummaries ?
                    <SentenceSummary sentences={segmentContentObj.sentenceSummaries} num={segmentContentObj.sentenceSummaries.length} />
                : null
                : null}
              </div>
              <div className={classes.scrollablePanel}>
                {hasPie() && hasSegment() ? 
                  <GroupPanels 
                    groups={segmentContentObj.barGraphs}
                    segmentName={segmentName}
                    colors={getLegendColors(currentAnalysis.metadata.analysisCategory)}
                    secondaryColor={secondaryGraphColor}
                    primaryField='graphName'
                    secondaryField='graphHighlight'
                    />
                :null}
              </div>

  
          </div>

        </div>
        
      {/*
        <SplitPane split="vertical" minSize={50} defaultSize={100} style={{height : '100%'}}>
            <div className={classes.root} style={{backgroundColor : 'red'}} >{analysisItem.analysisId} </div>
            <div className={classes.root} style={{backgroundColor : 'yellow'}}>{analysisItem.analysisName}</div>
        </SplitPane>
     */ }


    </Fade>: null
  )

}