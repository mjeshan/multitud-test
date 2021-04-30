import React,  {useEffect, useState} from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chart from "react-apexcharts";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '5rem',
  },
  captionPrimary:{
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: 500,
    marginTop: '3rem',
    width : 'auto',
    minWidth : '5rem',

  },
  captionSecondary:{
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 400,
    marginTop: '1rem',
    marginBottom: '1rem',
    width : 'auto',
    minWidth : '5rem',
  },
}));

export default function PieChart({onSegmentSelect=()=>{}, graphData=[], graphLabels=[], colors=null, primaryCaption=null, secondaryCaption=null, selectable=false}){
  const classes = useStyles();
  const series=graphData;
  const [selection, setSelection] = useState(undefined);
  const [options, setOptions] =useState({
    dataLabels: {
      enabled: false
    },
    labels: graphLabels,
    colors : colors,
    chart: {
      width: '100%',
      type: 'donut',
      events: {
        dataPointSelection: function(event, chartContext, config) {
          if(selectable){
            setSelection(config.dataPointIndex);
            onSegmentSelect(config.dataPointIndex);
          }

        },
        
      },
      selection:{
        enabled: selectable,
        stroke: {
          width: 1,
          dashArray: 3,
          color: '#ff0000',
          opacity: 0.4
        },
      },
    },
    legend: {
      position: 'bottom',
      offsetY: 0,
      height: 'auto',
      fontSize: '20rem',
      fontFamily: 'Roboto',
      fontWeight: 500,
      itemMargin: {
        horizontal: '15',
        vertical: '20',
    },
    }
  });

  useEffect(() => {
    if(Array.isArray(graphData) && graphData[0])
      onSegmentSelect(0);

    return () => {

    };
  }, []);

  return(
    <div className={classes.root}>
      {<Chart
        options={options}
        series={series}
        type="donut"
      />}
      <div className={classes.root} style={{alignItems : 'center', width: '100%'}}>
        {primaryCaption ? 
          <Typography 
            variant="h1" 
            color="textPrimary" 
            display="block" 
            className={classes.captionPrimary}>

            {primaryCaption}

          </Typography> : null}
        {secondaryCaption ?
          <Typography 
            variant="h2" 
            color={selectable ? "textPrimary" :"textSecondary"} 
            display="block" className={classes.captionSecondary} 
            style={{
                backgroundColor: selectable? "#647077" : null, 
                padding: selectable? '0.5rem': 0, 
                paddingRight:selectable? '1rem': 0,
                paddingLeft:selectable? '1rem': 0,
                color: selectable? '#ffffff':null,
                borderRadius:selectable? 3: 0,
                marginTop: selectable? '0.5rem': '1rem',}}>

            {secondaryCaption}

          </Typography>: null}
      </div>
    </div>

  )
}