import React from 'react';
import RealtimeLineChart from '../../components/widgets/chart/demos/RealtimeLineChart';

const colors = {
  labels: '#ccc',
  axis: 'black',
  guides: '#ccc',
  line: 'hotpink',
  background: '#eee',
};

export default {
  title: 'Widgets/Charts/Realtime Line-Chart Demo',
  component: RealtimeLineChart,
  argTypes: { maxValue: 100, minValue: 0, timestep: 1000, colors },
};

const Template = (args) => <RealtimeLineChart {...args} />;

export const Default = Template.bind({});
Default.args = { colors, maxValue: 100, minValue: 0, timestep: 1000 };
