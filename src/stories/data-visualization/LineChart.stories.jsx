import React from 'react';
import LineChart from '../../components/widgets/chart/LineChart';

const data = [
  { label: 'SU', x: 0, y: 0 },
  { label: 'M', x: 1, y: 400 },
  { label: 'T', x: 2, y: 300 },
  { label: 'W', x: 3, y: 100 },
  { label: 'TH', x: 4, y: 400 },
  { label: 'F', x: 5, y: 500 },
  { label: 'SA', x: 6, y: 400 },
];

export default {
  title: 'Widgets/Charts/Line Chart',
  component: LineChart,
  argTypes: {
    data,
  },
};

const Template = (args) => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data,
};
