import React, {useRef, useEffect} from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { historySelector, chartRangeSelector } from '../selectors/historySelector';
import { currentPriceSelector } from '../selectors/quoteSelector';
import { tickerSelector } from '../selectors/tickerSelector';
import { POSSIBLE_CHART_RANGES } from '../utils/constants';
import { Text } from '../components/generics/text';
import 'chartjs-plugin-annotation';



export const VisualDisplay = () => {

  const dispatch = useDispatch();

  const chartRef = useRef();

  const currentPrice = useSelector(currentPriceSelector)
  
  const chartRange = useSelector(chartRangeSelector);
  const historyData = useSelector(historySelector); 
  const currentSymbol = useSelector(tickerSelector);

  const handleChartRangeClick = (period) => {
    dispatch({ type: 'newChartRange', payload: period })
  }

  useEffect(() => {
    if (currentSymbol) {
      dispatch({ type: 'fetchHistory', payload: { symbol: currentSymbol, period: chartRange }})
    }
    
  }, [currentSymbol, chartRange])


  if (!historyData || !currentPrice) {
    return ( <div>loading</div>)
  }

  let formattedHistoryData = historyData.map((point) => {
    return {
      x: point.minute ? `${point.date} ${point.minute}` : point.date,
      y: point.price,
    };
  });

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
        label: {
          position: 'right',
          content: currentPrice,
          enabled: true,
          backgroundColor: 'rgb(233,86,86)',
        }
      }]
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          format: 'YYYY-MM-DD HH:mm'
        },
        gridLines: {
          display: true,
          color: "rgba(29,77,104, .3)"
        },
      }],
      yAxes: [{
        position: 'right',
        gridLines: {
          display: true,
          color: "rgba(29,77,104, .3)"
        },
      }]
    }
  }

  const plugins = [
    {
      id: 'syncGradient', 

      // whenever the chart's sets its layout (on initial render or after resizing), set the background gradient based on 
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
      {
        POSSIBLE_CHART_RANGES.map(period => (
          <Text mr="8px" display="inline-block" variant={period === chartRange ? "primary" : "secondary"} onClick={() => handleChartRangeClick(period)}>{period}</Text>
        ))
      }
      <Line ref={chartRef} data={data} options={options} plugins={plugins}/>
    </DisplayWrapper>
  );
};
