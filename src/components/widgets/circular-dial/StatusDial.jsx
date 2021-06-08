import React from 'react';
import PropTypes from 'prop-types';

import CircularDial from './CircularDial';

/**
 * This component demos using the CircularDial to show a binary state (offline/online)
 */

export default function StatusDial({ status, color, trueLabel, falseLabel }) {
  const [dialStatus, setDialStatus] = React.useState(0);

  // Convert and update the dial if the input status changes
  React.useEffect(() => {
    setDialStatus(status === true ? 100 : 0);
  }, [status]);

  /** DEMO EFFECT FOR SWAPPING ONLINE STATUS EVERY 2000ms */
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (dialStatus === 0) setDialStatus(100);
  //     if (dialStatus === 100) setDialStatus(0);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // });

  return (
    <CircularDial
      value={dialStatus}
      label={dialStatus > 50 ? trueLabel : falseLabel}
      color={color}
      labelOnly
    />
  );
}

StatusDial.propTypes = {
  status: PropTypes.bool,
  color: PropTypes.string,
  trueLabel: PropTypes.string,
  falseLabel: PropTypes.string,
};

StatusDial.defaultProps = {
  status: false,
  color: 'green',
  trueLabel: 'Online',
  falseLabel: 'Offline',
};

// Uses a 100%/0% to show online/offline status
