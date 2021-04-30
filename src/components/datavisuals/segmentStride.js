import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { blue, grey } from '@material-ui/core/colors';
import Bar from './bar';
import ExpandablePanel from './expandablePanel'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display: 'flex',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',

  },
  title: {
    // fontSize: '14rem',
    display: 'inline'
  },
  cardContainer: {
    width: '20%',
    // margin: '5px',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'left',
  },
  heading: {
    fontSize: 16,
    fontWeight: 500,
    maxWidth: '75%',
  },
  subHeading: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: '0.5rem',
    // marginLeft: '1rem',
  },
  medianText: {
    fontSize: '1em',
    color: 'blue',
    textAlign: 'left',
    fontWeight: 'bold'
  }
});

export default function SegmentStride(props) {
  const { data } = props;
  const classes = useStyles();

  const segmentContent = data && data.content && data.content.segments ? data.content.segments : null;


  return (
    <div className={classes.root}>
      {segmentContent ? segmentContent.map((curSegment, i) => {
        return (
          <div className={classes.cardContainer} key={i}>
            <ExpandablePanel
              key={i}
              defaultExpand={false}
              summaryChild={
                <div>
                  <Typography className={classes.title} variant="h6" color="textPrimary" gutterBottom>{curSegment.primaryText}</Typography>
                  <Typography className={classes.title} variant="h6" color="textSecondary" gutterBottom> ${curSegment.secondaryText}</Typography>
                  <Typography className={classes.medianText} variant="h6" gutterBottom> {curSegment.tertiaryText}</Typography>
                </div>
              }
              detailsChild={
                <div>
                  {curSegment.content && curSegment.content.products ? curSegment.content.products.map((item, j) => {
                    return (
                      <div className={classes.titleContainer} key={j}>
                        <Typography className={classes.heading} variant="subtitle1" color="textPrimary">{item.primaryText}</Typography>
                        <Typography className={classes.subHeading} variant="subtitle2" color="textSecondary">Total bought: {item.secondaryText}</Typography>
                        <Typography className={classes.subHeading} variant="subtitle2" color="textSecondary">Total Ordered Value: ${item.orderValue ? item.orderValue : null}</Typography>
                        <Bar barLength={item.barLength} color={blue[500]} />
                      </div>
                    );
                  }) : null}
                </div>
              }
            />
          </div>
        );
      }) : null}

    </div>
  );
}