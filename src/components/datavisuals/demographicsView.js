import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import { bold } from '../../utils/parsing'
import ExpandablePanel from './expandablePanel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //paddingBottom : 1,
    //padding : '0.5rem',
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
    alignItems: 'flex-start	',
    padding: '5%',
    paddingTop: 0,
  },
  titleContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
    fontWeight: 500,
    maxWidth: '75%',
  },
  subHeading: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: '1rem',
  },
  sentence: {
    textAlign: 'left',
    padding: '5px',
    wordWrap: 'break-word',
  },
  customTextList: {
    fontStyle: 'italic'
  },

}));



export default function DemographicsView(props) {
  const { content, summaryTitle } = props;
  const classes = useStyles();
  return (

    <div className={classes.root} variant="outlined">
      <Fade in={true} {...{ timeout: 1200 }}>
        <Accordion key={"expansion-panel"} className={classes.panelStyle} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={"panel-summary"}>
            <div className={classes.titleContainer}>
              <Typography className={classes.heading} variant="subtitle1" color="textPrimary">{summaryTitle}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.panelDetailContainer}>
              {content.carousels ?
                  content.carousels.map((item, i) => (
                    <div className={classes.sentence} key={i}>
                      <Typography>{bold(item.primaryText)}</Typography>
                      {item.tertiaryText && Array.isArray(item.tertiaryText) ?
                        <Typography color='textSecondary' className={classes.customTextList}>
                          {item.tertiaryText.join(", ")}
                        </Typography>
                        : null}
                    </div>
                  ))
                  : null}
            </div>
          </AccordionDetails>
        </Accordion>
      </Fade>
    </div >


  )

}