import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SimpleAxis from './simpleAxis';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    //paddingBottom : 1,
    padding : '0.5rem',
  },
  panelStyle: {
    backgroundColor: grey[200],
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  panelDetailContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5%',
    paddingTop: 0,
  },
}));

// Generic styled Accordion
export default function ExpandablePanel(props) {
  const classes = useStyles();
  const { summaryChild, detailsChild, defaultExpand=false } = props
  return (
    <div className={classes.root} variant="outlined">
      <Accordion className={classes.panelStyle} elevation={2} defaultExpanded={defaultExpand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={"panel-summary"}>
            {summaryChild}
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.panelDetailContainer}>
            <SimpleAxis />
            {detailsChild}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}