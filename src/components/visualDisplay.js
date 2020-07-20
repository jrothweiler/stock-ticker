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

  const data = {
    datasets: [
      {
        data: formattedHistoryData,
        lineTension: 0,
        borderColor: '#7fb3ff',
        borderWidth: 1,
        pointRadius: 0,
        spanGaps: true,
      }
    ]
  }
  const options = {
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

  const plugins = [
    {
      id: 'syncGradient', 

      // whenever the chart's layout is created, set the background gradient based on 
      // the new layout's height
      afterLayout: (chart) => {
        const newGradient = chart.ctx.createLinearGradient(0,0,0,chart.height);
        newGradient.addColorStop(0, 'rgba(127,149,255,.7)');
        newGradient.addColorStop(1, 'rgba(1,30,72,0)');

        chart.config.data.datasets[0].backgroundColor = newGradient;
      }
    }
  ]

  return (
    <DisplayWrapper width="80%">
      <Line ref={chartRef} data={data} options={options} plugins={plugins}/>
    </DisplayWrapper>
  );
};
