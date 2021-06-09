import React from 'react';
import CanvasLineChart from '../../components/widgets/chart/CanvasLineChart';

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

const colors = {
  labels: '#ccc',
  axis: 'black',
  guides: '#ccc',
  line: 'hotpink',
  background: '#eee',
};

export default {
  title: 'Widgets/Charts/Canvas Line-Chart',
  component: CanvasLineChart,
  argTypes: { height: 200, width: 500, viewThreshold: 100, colors, labels, data },
};

const Template = (args) => <CanvasLineChart {...args} />;

export const Default = Template.bind({});
Default.args = { height: 200, width: 500, viewThreshold: 100, colors, labels, data };
