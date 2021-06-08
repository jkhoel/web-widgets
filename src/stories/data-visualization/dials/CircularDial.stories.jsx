import React from 'react';

import CircularDial from '../../../components/widgets/circular-dial/CircularDial';

export default {
  title: 'Widgets/Dials/Circular Dial',
  component: CircularDial,
  argTypes: {
    value: 33,
    color: 'hotpink',
  },
};

const Template = (args) => <CircularDial {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 33,
  color: 'hotpink',
};
