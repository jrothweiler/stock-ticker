import React, {useRef} from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { Line } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { historySelector } from '../selectors/historySelector';
import { currentPriceSelector } from '../selectors/quoteSelector';
import 'chartjs-plugin-annotation';

export const VisualDisplay = () => {

  const chartRef = useRef();

  const currentPrice = useSelector(currentPriceSelector)

  const historyData = useSelector(historySelector);
  if (!historyData || !currentPrice) {
    return ( <div>loading</div>)
  }
  
  let formattedHistoryData = historyData.map(point => {
    return {
      x: `${point.date} ${point.minute}`,
      y: point.price
    }
  })

  const data = (canvas) => {
    console.log(canvas.height)
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(127,149,255,1)');
    gradient.addColorStop(1, 'rgba(1,30,72,0)');

    return {
      datasets: [
        {
          data: formattedHistoryData,
          backgroundColor: gradient,
          lineTension: 0,
          borderColor: '#7fb3ff',
          borderWidth: 1,
          pointRadius: 0,
          spanGaps: true,
        }
      ]
    }
  }
  const options = {
    onResize: (chart, newSize) => {
      console.log("I CHANGED!!!!!");
      console.log(chart);
      console.log(newSize);

      const newGradient = chart.ctx.createLinearGradient(0,0,0,newSize.height);
      newGradient.addColorStop(0, 'rgba(127,149,255,1)');
      newGradient.addColorStop(1, 'rgba(1,30,72,0)');

      chart.config.data.datasets[0].backgroundColor = newGradient;
    },
    annotation: {
      annotations: [{
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        value: currentPrice,
        borderColor: 'rgb(233, 86, 86)',
        borderWidth: 2,
        borderDash: [5, 3],
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
    <DisplayWrapper width="80%">
      <Line ref={chartRef} data={data} options={options}/>
    </DisplayWrapper>
  );
};
