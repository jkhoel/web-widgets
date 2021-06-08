import React from 'react';

import { ClockDial } from '../../../components/widgets/circular-dial';

export default {
  title: 'Widgets/Dials/Clock Dial',
  component: ClockDial,
  argTypes: {
    color: 'hotpink',
  },
};

const Template = (args) => <ClockDial {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'orange',
};
