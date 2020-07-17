import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { Line } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { historySelector } from '../selectors/historySelector';

export const VisualDisplay = () => {

  const historyData = useSelector(historySelector);
  if (!historyData) {
    return ( <div>loading</div>)
  }
  
  let formattedHistoryData = historyData.map(point => {
    return {
      x: `${point.date} ${point.minute}`,
      y: point.price
    }
  })

  const data = {
    datasets: [
      {
        data: formattedHistoryData,
        lineTension: 0,
        borderColor: '#FFFFFF',
        borderWidth: 1,
      }
    ]
  }
  const options = {
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: 400,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 4,
        label: {
          enabled: false,
          content: 'Test label'
        }
      }]
    },
    legend: {
      display: false
    },
    scales: {
      
      xAxes: [{
        type: 'time',
        time: {
          format: 'YYYY-MM-DD HH:mm'
        },
        gridLines: {
          display: true,
          color: "#4F5CAB"
        },
      }],
      yAxes: [{
        gridLines: {
          display: true,
          color: "#4F5CAB"
        },
      }]
    }
  }

  return (
    <DisplayWrapper width="50%">
      <Line data={data} options={options}/>
    </DisplayWrapper>
  );
};
