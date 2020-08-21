import "chartjs-plugin-annotation";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/generics/button";
import { Text } from "../components/generics/text";
import {
  chartRangeSelector,
  historySelector,
} from "../selectors/historySelector";
import { currentPriceSelector } from "../selectors/quoteSelector";
import { tickerSelector } from "../selectors/tickerSelector";
import { POSSIBLE_CHART_RANGES } from "../utils/constants";
import { DisplayWrapper } from "./generics/displayWrapper";
import type { ChartOptions } from "chart.js";
import { NEW_CHART_RANGE, FETCH_HISTORY } from "../utils/constants";
import { StyledSystem, Period, HistoryData } from "../types";
export const VisualDisplay = (props: StyledSystem) => {
  const dispatch = useDispatch();

  const currentPrice = useSelector(currentPriceSelector);

  const chartRange: Period = useSelector(chartRangeSelector);
  // we keep track of the previous range in the middle of a fetch of new history data,
  // so we don't change the formatting of the x axis times until new data is fetched
  const [prevRange, setPrevRange] = useState<Period | null>(null);

  const historyData: HistoryData[] = useSelector(historySelector) || [];
  const currentSymbol: string | null = useSelector(tickerSelector);

  // when a chart range button is clicked, track the current range, and store the new
  // range in redux
  const handleChartRangeClick = (period: Period) => {
    setPrevRange(chartRange);
    dispatch({ type: NEW_CHART_RANGE, payload: period });
  };

  // when history data is successfully fetched, clear the previous range so we format
  // according to the current range
  useEffect(() => {
    setPrevRange(null);
  }, [historyData]);

  useEffect(() => {
    if (currentSymbol) {
      dispatch({
        type: FETCH_HISTORY,
        payload: { symbol: currentSymbol, period: chartRange },
      });
    }
  }, [currentSymbol, chartRange, dispatch]);

  // if we have a previous range, format according to that, otherwise format according to redux one
  const xAxisRange = prevRange || chartRange;

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
        borderColor: "#7fb3ff",
        borderWidth: 1,
        pointRadius: 0,
        spanGaps: true,
      },
    ],
  };
  const options: ChartOptions = {
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          value: currentPrice,
          borderColor: "rgb(233, 86, 86)",
          borderWidth: 2,
          borderDash: [5, 3],
          label: {
            position: "right",
            content: currentPrice?.toString(),
            enabled: true,
            backgroundColor: "rgb(233,86,86)",
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "series",
          time: {
            minUnit: "hour",
            displayFormats: {
              hour: xAxisRange === "1D" ? "h:mm a" : "MMM DD  h:mm a",
            },
            //format: "YYYY-MM-DD HH:mm",
          },
          ticks: {
            //fontWeight: "lighter",
            fontFamily: "Lato",
            autoSkip: true,
            maxTicksLimit: 10,
          },
          gridLines: {
            display: true,
            color: "rgba(29,77,104, .3)",
          },
        },
      ],
      yAxes: [
        {
          position: "right",
          ticks: {
            //fontWeight: "lighter",
            fontFamily: "Lato",
            callback: function (label: number) {
              return label.toFixed(2);
            },
          },
          gridLines: {
            display: true,
            color: "rgba(29,77,104, .3)",
          },
        },
      ],
    },
  };

  const plugins = [
    {
      id: "syncGradient",

      // whenever the chart's sets its layout (on initial render or after resizing), set the background gradient based on
      // the new layout's height
      afterLayout: (chart: any) => {
        const newGradient = chart.ctx.createLinearGradient(
          0,
          0,
          0,
          chart.height
        );
        newGradient.addColorStop(0, "rgba(127,149,255,.7)");
        newGradient.addColorStop(1, "rgba(1,30,72,0)");

        chart.config.data.datasets[0].backgroundColor = newGradient;
      },
    },
  ];

  return (
    <DisplayWrapper {...props}>
      <DisplayWrapper display="flex" justifyContent="flex-end" mb="8px">
        {POSSIBLE_CHART_RANGES.map((period: any) => (
          <Button
            key={period}
            variant="unstyled"
            mr="8px"
            onClick={() => handleChartRangeClick(period)}
          >
            <Text variant={period === chartRange ? "primary" : "secondary"}>
              {period}
            </Text>
          </Button>
        ))}
      </DisplayWrapper>
      <Line data={data} options={options} plugins={plugins} />
    </DisplayWrapper>
  );
};
