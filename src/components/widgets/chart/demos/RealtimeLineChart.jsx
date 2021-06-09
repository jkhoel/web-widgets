import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import CanvasLineChart from '../CanvasLineChart';

// const data = [
//   {
//     legend: 'series1',
//     color: 'red',
//     values: [
//       { x: 0, y: 0 },
//       { x: 1, y: 400 },
//       { x: 2, y: 300 },
//       { x: 3, y: 100 },
//       { x: 4, y: 400 },
//       { x: 5, y: 500 },
//       { x: 6, y: 400 },
//     ],
//   },
//   {
//     legend: 'series2',
//     color: 'blue',
//     values: [
//       { x: 0, y: 100 },
//       { x: 1, y: 200 },
//       { x: 2, y: 100 },
//       { x: 3, y: 500 },
//       { x: 4, y: 400 },
//       { x: 5, y: 200 },
//       { x: 6, y: 300 },
//     ],
//   },
// ];

const data = [
  {
    legend: 'series1',
    color: 'hotpink',
    values: [],
  },
  {
    legend: 'series2',
    color: 'cyan',
    values: [],
  },
];

// const CHART_THRESHOLD = 10;

const RealtimeLineChart = ({ colors, maxValue, minValue, timestep, viewThreshold }) => {
  const chartDataReducer = (chartData, action) => {
    const x = chartData[0].values.length;

    switch (action.type) {
      case 'add':
        // Add the new point to the end of each series and return the new chart data
        chartData.forEach((series) => {
          const y = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
          series.values.push({ x, y });
        });
        return chartData;
      case 'remove-first':
        // Remove first data-point from each series
        chartData.forEach((series) => {
          series.values.shift();
        });
        // chartData[0].values.shift();
        // Re-index the dataset

        // Return the result
        return chartData;
      default:
        throw new Error();
    }
  };

  const [chartData, dispatchChartData] = useReducer(chartDataReducer, data);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatchChartData({ type: 'add' });
      // if (chartData[0].values.length > CHART_THRESHOLD) dispatchChartData({ type: 'remove-first' });
    }, timestep);

    return () => clearInterval(interval);
  });

  return (
    <CanvasLineChart
      data={chartData}
      labels={[]}
      colors={colors}
      height={200}
      width={500}
      viewThreshold={viewThreshold}
    />
  );
};

RealtimeLineChart.propTypes = {
  viewThreshold: PropTypes.number,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  timestep: PropTypes.number,
  colors: PropTypes.objectOf(
    PropTypes.shape({
      labels: PropTypes.string,
      axis: PropTypes.string,
      guides: PropTypes.string,
      line: PropTypes.string,
      background: PropTypes.string,
    }),
  ),
};

RealtimeLineChart.defaultProps = {
  viewThreshold: null,
  maxValue: 100,
  minValue: 0,
  timestep: 1000,
  colors: {
    labels: '#ccc',
    axis: 'black',
    guides: '#ccc',
    line: 'hotpink',
    background: '#eee',
  },
};

export default RealtimeLineChart;
