import React from 'react';

import { StatusDial } from '../../../components/widgets/circular-dial';

export default {
  title: 'Widgets/Dials/Status Dial',
  component: StatusDial,
  argTypes: {
    status: false,
    color: 'hotpink',
    trueLabel: 'Online',
    falseLabel: 'Offline',
  },
};

const Template = (args) => <StatusDial {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: false,
  color: 'cyan',
  trueLabel: 'Online',
  falseLabel: 'Offline',
};
