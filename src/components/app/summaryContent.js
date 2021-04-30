import React, { useEffect, useState } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import { grey, blueGrey } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { bold } from '../../utils/parsing';
import Fade from '@material-ui/core/Fade';
import StyledExpandablePanel from '../datavisuals/styledExpandablePanel';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '100%',
    // height: 'auto',
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '3rem',

  },
  // copied from ExpandablePanel
  panelStyle: {
    textAlign: 'left',
    width: '25rem',
    marginRight: '3rem',
    marginBottom: '3rem',
    backgroundColor: grey[200],
    padding: '2rem',
    borderRadius: 15,
    boxShadow: '0px 0px 40px 4px rgba(0, 0, 0, 0.15)',
  },
  customTextList: {
    fontStyle: 'italic'
  },
  panelContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  panelItem: {
    width: '30%'
  }
}));

const secondaryGraphColor = grey[500];

export default function SummaryContent(props) {
  const classes = useStyles();
  const { content } = props
  return (
    <Fade in={true} {...{ timeout:1400}}>
      <div className={classes.root}>
        {content.carousels ?
          content.carousels.map((item, i) => {
            return (

                <div className={classes.panelStyle} elevation={10} key={i}>
                  
                    <Typography>{bold(item.primaryText)}</Typography>
                    {item.tertiaryText && Array.isArray(item.tertiaryText) ?
                      <Typography color='textSecondary' className={classes.customTextList}>
                        {item.tertiaryText.join(", ")}
                      </Typography>
                      : null}
                    {/* <Typography>{item.secondaryText}</Typography> */}
                
                </div>
              
            );
          })
          
          :
          content.barGraphs ?
            <div className={classes.panelContainer} variant="outlined">
              {Array.isArray(content.barGraphs) && content.barGraphs[0] ?
                content.barGraphs.map((item, i) =>
                  <StyledExpandablePanel
                    className={classes.panelItem}
                    key={i}
                    item={item}
                    colors={['#0887ff', secondaryGraphColor]}
                    primaryField='graphName'
                    secondaryField='graphHighlight'
                    secondaryColor={secondaryGraphColor}
                  />)
                : null}
            </div>
            : null
        }
      </div>
    </Fade>
  );
}