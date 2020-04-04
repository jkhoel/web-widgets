import React from 'react';
import PropTypes from 'prop-types';

import CircularDial from '../index';

/**
 * This component demos the CircularDial counting up/down between 0% and 100%
 */

export default function DemoDial({ step }) {
  const [value, setValue] = React.useState(0);

  /** DEMO EFFECT */
  const [countUp, setCountUp] = React.useState(true);

  React.useEffect(() => {
    // const step = 2;

    const interval = setInterval(() => {
      if (countUp) {
        const val = value + step;
        setValue(val);
        if (val >= 100) setCountUp(false);
      } else {
        const val = value - step;
        setValue(val);
        if (val <= 0) setCountUp(true);
      }
    }, 50);

    return () => clearInterval(interval);
  });

  return <CircularDial value={value} color="cyan" />;
}

DemoDial.propTypes = {
  step: PropTypes.number,
};

DemoDial.defaultProps = {
  step: 2,
};
