import React from 'react';
import LineChart from '../../components/widgets/chart/LineChart';

const labels = ['SU', 'M', 'T', 'W', 'TH', 'F', 'SA'];

const data = [
  {
    legend: 'series1',
    color: 'hotpink',
    values: [
      { x: 0, y: 0 },
      { x: 1, y: 400 },
      { x: 2, y: 300 },
      { x: 3, y: 100 },
      { x: 4, y: 400 },
      { x: 5, y: 500 },
      { x: 6, y: 400 },
    ],
  },
  {
    legend: 'series2',
    color: 'chartreuse',
    values: [
      { x: 0, y: 100 },
      { x: 1, y: 200 },
      { x: 2, y: 100 },
      { x: 3, y: 500 },
      { x: 4, y: 400 },
      { x: 5, y: 200 },
      { x: 6, y: 300 },
    ],
  },
];

export default {
  title: 'Widgets/Charts/Line Chart',
  component: LineChart,
  argTypes: {
    data,
    labels,
    colors: {
      labels: '#ccc',
      axis: 'black',
      guides: '#ccc',
      line: 'hotpink',
      background: '#eee',
    },
  },
};

const Template = (args) => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data,
  labels,
  colors: {
    labels: '#ccc',
    axis: 'black',
    guides: '#ccc',
    line: 'hotpink',
    background: '#eee',
  },
};
