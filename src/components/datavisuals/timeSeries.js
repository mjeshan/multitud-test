import { Opacity } from '@material-ui/icons';
import React, { useState } from 'react';
import Chart from "react-apexcharts";
import Typography from '@material-ui/core/Typography';

function numberWithCommas(x) {
  var ret = x;
  if (x)
  {
    if (x < 100)
     ret = x.toFixed(2)
    else
     ret = x.toFixed(0)

    return ret.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  else return "";
}

export default function TimeSeries({ graphData = null, colors = null, isRangeGraph = false}) {
  const [stackedGraph, setStackedGraph] = useState(false)
  const [lineGraph, setLineGraph] = useState(false)
  const reduceValues = (curValues, newVal) => {
    curValues = curValues.concat(Object.entries(newVal))
    return curValues
  }
  const numLines = Object.keys(graphData.graphContent).length
  // Remove orange color for time graphs with only 2 lines
  if (numLines == 2) {
    colors = colors.slice()
    colors.splice(2, 1)
  }

  const opacityList = []    // ex [0.3, 0.3, 0.3, 1]
  for (var i = 0; i < numLines; i++) {
    opacityList.push(0.4)
  }
  opacityList.push(1)

  const opacityListTo = []    // ex [0.3, 0.3, 0.3, 1]
  for (var i = 0; i < numLines; i++) {
    opacityListTo.push(0.2)
  }
  opacityListTo.push(1)

  // TODO - move this to a init function (idk how React works) to avoid re-running every time the component renders
  let series = []
  if (isRangeGraph) {
    for (const [segmentName, segmentValues] of Object.entries(graphData['graphContent'])) {
      let data = []
      for (const val of segmentValues) {
        data.push({
          x: Object.keys(val)[0],
          y: Object.values(val)[0][1]
        })
      }
      series.push({
        name: segmentName,
        data: data,
        type: 'area'
      })
    }
    series = series.reverse();
  } else {
    for (const [segmentName, segmentValues] of Object.entries(graphData['graphContent'])) {
      series.push({
        name: segmentName,
        data: segmentValues.reduce(reduceValues, []),
        type: lineGraph ? 'line' : 'area',
      })
    }
    series = series.reverse();
    // Add total graph equal to sum of all the segments graphs
    if (!stackedGraph) {
      let totalLine = {
        "name": "Total Graph",
        "data": [],
        "type": "line"
      };
      for (let i = 0; i < series[0].data.length; i++) {
        let date = series[0].data[i][0];
        let sum = 0;
        for (const segmentData of series) {
          let val = segmentData.data[i][1];
          if (typeof segmentData.data[i][1] === 'string') {
            sum += parseFloat(val)
          } else {
            sum += val
          }
        }
        totalLine["data"].push([date, sum]);
      }
      series.push(totalLine);
    }
  }
  // How y-axis labels are formatted
  let y_formatter = (value) => { return numberWithCommas(value) };
  if (graphData && graphData.graphAxisLabelFormat && graphData.graphAxisLabelFormat.y && graphData.graphAxisLabelFormat.y === 'dollarAmount') {
    y_formatter = (value) => { return '$' + numberWithCommas(value)};

  }

  let options = {
    chart: {
       type: lineGraph ? 'line' : 'area',
      height: 350,
      width: '50%',
      stacked: stackedGraph,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      }
    },
    grid: {
      show: false,
    },
    colors: colors,
    dataLabels: {
      enabled: false
    },
    // if these arent set the high and low value colours are switched for some reason :/
    markers: {
      colors: colors
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type:  lineGraph ? 'solid' : 'gradient',
      //opacity: 0.1,
      gradient: {
        //opacityFrom: opacityListTo,
        //opacityTo: opacityList
        opacityFrom: opacityList,
        opacityTo: opacityListTo,
        stops: [0, 75, 100],
        shade: 'light',
        type: "vertical",
      }
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left'
    },
    title: {
      show: false,
      text: undefined, //graphData['graphName'],
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#263238'
      },
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      labels: {
        formatter: y_formatter
      },
      title: {
        text: undefined,  //graphData['graphAxisTypes']['y'],
        style: {
          fontSize: 20
        }
      }
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: 'auto', width: '100%'}}>
      {graphData.graphName? 
        <Typography variant="h5" color="textPrimary" >{graphData.graphName}</Typography> : null}
      {graphData.graphAxisTypes && graphData.graphAxisTypes.y? 
        <Typography variant="subtitle1" color="textSecondary" >{"Measured by: " + graphData.graphAxisTypes.y}</Typography> : null}
      <div style={{ width: '100%', height: '40vh', minHeight: 150,}}>
        <Chart
          options={options}
          series={series}
          width="100%"
          height="100%"
          // type={lineGraph ? 'line' : 'area'}
        />

      </div>
    </div>
  );
}