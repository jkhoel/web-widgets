import React from 'react';
import PropTypes from 'prop-types';

const STROKE = 1;

const LineChart = ({
  data,
  width,
  height,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
  precision,
}) => {
  const FONT_SIZE = width / 50;
  const maximumXFromData = Math.max(...data.map((e) => e.x));
  const maximumYFromData = Math.max(...data.map((e) => e.y));

  const digits = parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  // const padding = 5;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Axis Component
  const Axis = ({ points }) => (
    <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
  );

  // Axis start: (padding, height - padding) Axis end: (width - padding, height - padding)
  const XAxis = () => (
    <Axis points={`${padding},${height - padding} ${width - padding},${height - padding}`} />
  );

  // Axis start: (padding, padding)   // Axis end: (padding, height - padding)
  const YAxis = () => <Axis points={`${padding},${padding} ${padding},${height - padding}`} />;

  // Iterate over each point in the data and create plot coordinates
  const points = data
    .map((dataPoint) => {
      const x = (dataPoint.x / maximumXFromData) * chartWidth + padding;
      const y = chartHeight - (dataPoint.y / maximumYFromData) * chartHeight + padding;
      return `${x}, ${y}`;
    })
    .join(' ');

  // Create horizontal guides
  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width - padding;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const ratio = (index + 1) / numberOfHorizontalGuides;
      const yCoordinate = chartHeight - chartHeight * ratio + padding;

      return (
        <polyline
          key={`horiz-guide-${index + 1}`}
          fill="none"
          stroke="#ccc"
          strokeWidth=".5"
          points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
        />
      );
    });
  };

  // Create vertical guides
  const VerticalGuides = () => {
    const guideCount = numberOfVerticalGuides || data.length - 1;

    const startY = padding;
    const endY = height - padding;

    return new Array(guideCount).fill(0).map((_, index) => {
      const ratio = (index + 1) / guideCount;
      const xCoordinate = padding + ratio * (width - padding * 2);

      return (
        <polyline
          key={`vert-guide-${index + 1}`}
          fill="none"
          stroke="#ccc"
          strokeWidth=".5"
          points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
        />
      );
    });
  };

  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2;

    return data.map((dataPoint) => {
      const x = (dataPoint.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;

      return (
        <text
          x={x}
          y={y}
          style={{ fill: '#ccc', fontSize: FONT_SIZE, fontFamily: 'Helvetica' }}
          key={`xaxis-label-${dataPoint.x}`}
        >
          {dataPoint.label}
        </text>
      );
    });
  };

  const LabelsYAxis = () => {
    const PARTS = numberOfHorizontalGuides;

    return new Array(PARTS + 1).fill(0).map((_, index) => {
      const x = FONT_SIZE;

      const ratio = index / numberOfHorizontalGuides;

      const yCoordinate = chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;

      return (
        <text
          x={x}
          y={yCoordinate}
          style={{ fill: '#ccc', fontSize: FONT_SIZE, fontFamily: 'Helvetica' }}
          key={`yaxis-label-${index + 1}`}
        >
          {parseFloat(maximumYFromData * (index / PARTS)).toFixed(precision)}
        </text>
      );
    });
  };

  // return <div>hello world</div>;

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <XAxis />
      <LabelsXAxis />
      <YAxis />
      <LabelsYAxis />
      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />

      <polyline fill="none" stroke="#0074d9" strokeWidth={STROKE} points={points} />
    </svg>
  );
};

LineChart.defaultProps = {
  height: 200,
  width: 500,
  horizontalGuides: 4,
  verticalGuides: null,
  precision: 2,
};

LineChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  horizontalGuides: PropTypes.number,
  verticalGuides: PropTypes.number,
  precision: PropTypes.number,
};

export default LineChart;
