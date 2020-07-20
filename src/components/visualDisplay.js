import React from "react";
import { DisplayWrapper } from "./generics/displayWrapper";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { historySelector } from "../selectors/historySelector";

export const VisualDisplay = () => {
  const historyData = useSelector(historySelector);
  if (!historyData) {
    return <div>loading</div>;
  }

  let formattedHistoryData = historyData.map((point) => {
    return {
      x: `${point.date} ${point.minute}`,
      y: point.price,
    };
  });

  const data = {
    datasets: [
      {
        data: formattedHistoryData,
        borderColor: "#FFFFFF",
      },
    ],
  };
  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "YYYY-MM-DD HH:mm",
          },
          gridLines: {
            display: true,
            color: "#4F5CAB",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: "#4F5CAB",
          },
        },
      ],
    },
  };

  return (
    <DisplayWrapper width="50%">
      <Line data={data} options={options} />
    </DisplayWrapper>
  );
};
