import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { grey } from '@material-ui/core/colors';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import {bold} from '../../utils/parsing'

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
  }
}));



export default function SentenceSummary(props) {
  const {sentences, num} = props;
  const classes = useStyles();
  return (

    <div className={classes.root} variant="outlined">
      <Fade in={true} {...{ timeout: 1200}}>
        <Accordion key={"expansion-panel"} className={classes.panelStyle} elevation={2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id={"panel-summary"}>
            <div className={classes.titleContainer}>
              <Typography className={classes.heading} variant="subtitle1" color="textPrimary">Describe this segment</Typography>
              <Typography className={classes.subHeading} variant="subtitle2" color="textSecondary">{num + " sentences"}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.panelDetailContainer}>
              {Array.isArray(sentences) && sentences[0] ?
                sentences.map((item, i) => <div key={i} className={classes.sentence}>{bold(item)}</div>)
                : null}
            </div>
          </AccordionDetails>
        </Accordion>
      </Fade>
    </div>

  )

}