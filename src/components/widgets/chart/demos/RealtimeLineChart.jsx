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
    color: 'red',
    values: [],
  },
];

const RealtimeLineChart = ({ colors, maxValue, minValue, timestep }) => {
  const chartDataReducer = (chartData, action) => {
    const x = action.lastX > 0 ? action.lastX : 0;
    const y = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);

    switch (action.type) {
      case 'add':
        // console.log({ x, y }, chartData);
        chartData[0].values.push({ x, y });
        return chartData;
      default:
        throw new Error();
    }
  };

  const [chartData, dispatchChartData] = useReducer(chartDataReducer, data);

  useEffect(() => {
    const interval = setInterval(() => {
      // Find last X value, and add a new point to the series. TODO: Add support for creating multiple series
      const lastX = Math.max(...data.map(({ values }) => values.map((v) => v.x)).flat());
      dispatchChartData({ type: 'add', lastX });
    }, timestep);

    return () => clearInterval(interval);
  });

  return <CanvasLineChart data={chartData} labels={[]} colors={colors} height={200} width={500} />;
};

RealtimeLineChart.propTypes = {
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
