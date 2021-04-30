import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BarGraph from './barGraph';
import ExpandablePanel from './expandablePanel';

const useStyles = makeStyles((theme) => ({
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


export default function StyledExpandablePanel(props) {
  const { item, colors, primaryField, secondaryField, secondaryColor = null } = props
  const classes = useStyles();

  return (
    <ExpandablePanel
        summaryChild={
        <div className={classes.titleContainer}>
            <Typography className={classes.heading} variant="subtitle1" color="textPrimary">{item[primaryField]}</Typography>
            <Typography className={classes.subHeading} variant="subtitle2" color="textSecondary">{item[secondaryField]}</Typography>
        </div>}
        detailsChild={<BarGraph graphData={item} colors={colors} secondaryColor={secondaryColor} />}
    >
    </ExpandablePanel>
  )
}