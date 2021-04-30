import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TimeSeries from '../datavisuals/timeSeries';
import SegmentStride from '../datavisuals/segmentStride';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',

  },
  textStyle: {
    fontSize: 12,
    fontWeight: 500,

  },


}));


export default function ToggleContent(props) {
  const classes = useStyles();
  const { toggleContent, graphColors, nameKey, toggleType } = props;
  const defaultContent = toggleContent && toggleContent[0] ? toggleContent[0] : null;
  const [content, setContent] = useState(defaultContent);
  const [value, setValue] = useState(0);
  var contentMap = {};
  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(event, newValue) => {
          if (contentMap && contentMap[newValue]) {
            setValue(newValue);
            setContent(contentMap[newValue])
          }
        }}
        aria-label="toggle content"
        style={{ marginBottom: '1.5vh' }}
      >
        {Array.isArray(toggleContent) ?
          toggleContent.map((item, i) => {
            if (item && item.hasOwnProperty(nameKey)) {
              contentMap[i] = item;
              return (
                <ToggleButton value={i} key={i}>
                  <Typography className={classes.textStyle} >{item[nameKey]} </Typography>
                </ToggleButton>)
            }
            else return null;

          })
          : null}
      </ToggleButtonGroup>
      {content ? (() => {
        switch (toggleType) {
          case 'timeseries':
            return <TimeSeries graphData={content} colors={graphColors} isRangeGraph={content.graphName == "Distribution of Customer Segment Boundaries"} />;
          case 'product':
            return <SegmentStride data={content} />;
          default: return null;
        }
      })() : null}
    </div>
  )
}