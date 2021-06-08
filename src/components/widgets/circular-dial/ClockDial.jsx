import React from 'react';
import moment from 'moment';

import CircularDial from './CircularDial';

/**
 * This component demos the CircularDial used as a clock, with the ring lighting
 * up with seconds in a minute
 */

export default function ClockDial() {
  const [value, setValue] = React.useState(moment().second());
  const [label, setLabel] = React.useState(moment().format('HH:mm:ss'));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLabel(moment().format('HH:mm:ss'));
      setValue(moment().second());
    }, 500);

    return () => clearInterval(interval);
  });

  return <CircularDial value={value} maxValue={60} color="orange" label={label} labelOnly />;
}
