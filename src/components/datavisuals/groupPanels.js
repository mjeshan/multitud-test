import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {grey} from '@material-ui/core/colors';
import Fade from '@material-ui/core/Fade';
import BarGraph from './barGraph';
import StyledExpandablePanel from './styledExpandablePanel';

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
    alignItems: 'center',
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
  }
}));


export default function GroupPanels(props) {
  const { groups, colors, primaryField, secondaryField, segmentName = "", secondaryColor = null } = props
  const classes = useStyles();

  return (

    <div className={classes.root} variant="outlined">
      {Array.isArray(groups) && groups[0] ?
        groups.map((item, i) =>
          <Fade in={true} {...{ timeout: 1200 + i * 200 }} key={segmentName + item.graphName + i}>
            <StyledExpandablePanel
              item={item}
              colors={colors}
              primaryField={primaryField}
              secondaryField={secondaryField}
              secondaryColor={secondaryColor}
              />
          </Fade>)
        : null}
    </div>

  )

}