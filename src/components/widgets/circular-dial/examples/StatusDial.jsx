import React from 'react';
import PropTypes from 'prop-types';

import CircularDial from '../index';

/**
 * This component demos using the CircularDial to show a binary state (offline/online)
 */

export default function StatusDial({ status }) {
  const [dialStatus, setDialStatus] = React.useState(0);

  // Convert and update the dial if the input status changes
  React.useEffect(() => {
    setDialStatus(status === true ? 100 : 0);
  }, [status]);

  /** DEMO EFFECT FOR SWAPPING ONLINE STATUS EVERY 2000ms */
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (dialStatus === 0) setDialStatus(100);
      if (dialStatus === 100) setDialStatus(0);
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <CircularDial value={dialStatus} label={dialStatus > 50 ? 'online' : 'offline'} labelOnly />
  );
}

StatusDial.propTypes = {
  status: PropTypes.bool,
};

StatusDial.defaultProps = {
  status: false,
};

// Uses a 100%/0% to show online/offline status
