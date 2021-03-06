import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/** Styled Components */
const DialContainer = styled.div`
  cursor: inherit;
  height: 150px;
  position: relative;
  width: 150px;

  &:hover h2 {
    color: #fff;
    font-size: 2.5rem;
  }
`;

const Value = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  text-transform: uppercase;
  top: -0.5rem;
  width: 100%;

  & h2 {
    color: #777;
    font-size: 2rem;
    font-weight: 700;
    transition: 0.25s;
  }
`;

const Label = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  text-transform: uppercase;
  top: 1.5rem;
  width: 100%;

  & h3 {
    color: #777;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 1px;
  }
`;

const LabelOnly = styled(Label)`
  top: 0;

  & h3 {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 1px;
    top: 0;
  }
`;

const Dial = styled.svg`
  height: 150px;
  position: relative;
  transform: rotate(-175deg);
  width: 150px;
  z-index: 1000;

  & circle {
    fill: none;
    height: 95%;
    stroke: #191919;
    stroke-linecap: square;
    stroke-width: 10px;
    transform: translate(5px, 5px);
    width: 95%;

    /* Styling for indicator ring: */
    &:nth-child(2) {
      stroke: ${(props) => props.color || '#444'};
      stroke-dasharray: 440;
      stroke-dashoffset: calc(440 - (440 * ${(props) => props.value || 0}));
    }
  }
`;

/** CircularDial */
const CircularDial = ({ value, minValue, maxValue, color, unit, label, labelOnly }) => {
  const [dialValue, setDialValue] = React.useState(0);
  const [dialColor, setDialColor] = React.useState('#00ff43');

  // Update the dial value if any of the required values change
  React.useEffect(() => {
    setDialValue(value / (maxValue - minValue));
  }, [value, minValue, maxValue]);

  // Change dial color if the prop change
  React.useEffect(() => {
    setDialColor(color);
  }, [color]);

  // if the labelOnly option is enabled, return a dial showing only the label
  if (labelOnly) {
    return (
      <DialContainer>
        <Dial color={dialColor} value={dialValue}>
          <circle cx="70" cy="70" r="70" />
          <circle cx="70" cy="70" r="70" />
        </Dial>
        <LabelOnly>
          <h3>{label}</h3>
        </LabelOnly>
      </DialContainer>
    );
  }

  return (
    <DialContainer>
      <Dial color={dialColor} value={dialValue}>
        <circle cx="70" cy="70" r="70" />
        <circle cx="70" cy="70" r="70" />
      </Dial>
      <Value>
        <h2>
          {labelOnly ? null : value}
          <span>{unit}</span>
        </h2>
      </Value>
      <Label>
        <h3>{label}</h3>
      </Label>
    </DialContainer>
  );
};

CircularDial.propTypes = {
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  color: PropTypes.string,
  unit: PropTypes.string,
  label: PropTypes.string,
  labelOnly: PropTypes.bool,
};

CircularDial.defaultProps = {
  value: 0,
  minValue: 0,
  maxValue: 100,
  color: '#00ff43',
  unit: '%',
  label: 'kevin',
  labelOnly: false,
};

export default CircularDial;
