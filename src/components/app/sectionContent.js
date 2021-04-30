import React, { useEffect, useState } from 'react';
import { blueGrey, red, pink, purple, deepPurple, indigo, blue, 
  lightBlue, cyan, teal, green, lightGreen, lime,
   yellow, amber, orange, deepOrange,grey  } from '@material-ui/core/colors';
import { makeStyles, } from '@material-ui/core/styles';
import GroupPanels from '../datavisuals/groupPanels';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import ToggleContent from './toggleContent';
import SummaryContent from './summaryContent';

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
    overflow: 'hidden', 
    padding: '4rem',
  },
  productContainer: {
    textAlign: 'left',
    marginBottom: '2rem',
  },
  productSection: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    margin: '30px',
    // width: '95%',
  },
  sectionTitle: {
    textAlign: 'left',
    display: 'inline',
  }

}));


const secondaryColor = blueGrey[50]
export default function SectionContent(props) {
  const classes = useStyles();
  const { analysisItem, isBusy, getAnalysis, currentAnalysis, analysisType } = props
  const nameKey = "primaryText"
  useEffect(() => {
    if (analysisItem && currentAnalysis && (analysisItem.analysisId === currentAnalysis.analysisId || analysisItem === currentAnalysis)) {
      
    }
    else if (analysisItem && analysisItem.analysisId) {
      getAnalysis(analysisItem.analysisId);
    }
    return () => {};
  }, [analysisItem]);

  const parseAutoComparatorSegments = (text) => {
    let segments = text.split("vs")
    return (
      <div>
        <Typography variant="h5" style={{display: 'inline', fontWeight: 'bold', marginLeft: '1rem'}}>{segments[0]}</Typography>
        <p style={{display: 'inline', fontSize: '1.5rem'}}> vs </p>
        <Typography variant="h5" style={{display: 'inline', fontWeight: 'bold'}}>{segments[1]}</Typography>
      </div>
    )
  }

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
            {currentAnalysis.sections ? currentAnalysis.sections.map((section, i) => {
              return(
                <div className={classes.productContainer} key={i}>
                  <Typography className={classes.sectionTitle} variant="h5">
                    {currentAnalysis.metadata.analysisName == 'Insights' ?
                      parseAutoComparatorSegments(section.primaryText)
                      :  
                      section.primaryText}
                  </Typography>
                  {currentAnalysis.metadata.analysisName == 'Top Products' && section.secondaryText?
                    <Typography variant="h6" color='textSecondary' style={{margin: '1rem', display: 'inline'}}>
                      {section.secondaryText}
                    </Typography>
                    : null}
                  {analysisType == 'CUSTOMER_SEGMENT' ?
                    <div>
                      <SummaryContent content={section.content} sectionIndex={i}/>
                    </div>
                    :
                    <div className={classes.productSection}>
                      <ToggleContent toggleContent={section.content.carousels} nameKey={nameKey} toggleType={'product'} />
                    </div>}
                </div>
            );}) : null}
          </div>
        </Fade> : null
  );
}