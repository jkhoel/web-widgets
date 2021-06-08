import React from 'react';
import PropTypes from 'prop-types';

const STROKE = 1;

// Main LineChart Component
const LineChart = ({
  labels,
  data,
  width,
  height,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
  precision,
  colors,
}) => {
  const FONT_SIZE = width / 50;
  const maximumXFromData = Math.max(...data.map(({ values }) => values.map((v) => v.x)).flat());
  const maximumYFromData = Math.max(...data.map(({ values }) => values.map((v) => v.y)).flat());

  const digits = parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 3;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Axis Component
  const Axis = ({ points }) => (
    <polyline fill="none" stroke={colors.axis} strokeWidth=".5" points={points} />
  );

  Axis.propTypes = {
    points: PropTypes.string.isRequired,
  };

  // Line for the X axis
  const XAxis = () => (
    <Axis points={`${padding},${height - padding} ${width - padding},${height - padding}`} />
  );

  // Line for the X axis
  const YAxis = () => <Axis points={`${padding},${padding} ${padding},${height - padding}`} />;

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
          stroke={colors.guides}
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
          stroke={colors.guides}
          strokeWidth=".5"
          points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
        />
      );
    });
  };

  // Generate X-axis Labels
  const LabelsXAxis = () => {
    // Find y position ("height")
    const y = height - padding + FONT_SIZE * 2;

    // Create labels
    return labels.map((label, index) => {
      const x = (index / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;

      return (
        <text
          x={x}
          y={y}
          style={{ fill: colors.labels, fontSize: FONT_SIZE, fontFamily: 'Helvetica' }}
          key={`x-label-${label}`}
        >
          {label}
        </text>
      );
    });
  };

  // Generate Y-axis labels
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
          style={{ fill: colors.labels, fontSize: FONT_SIZE, fontFamily: 'Helvetica' }}
          key={`y-label-${index + 1}`}
        >
          {parseFloat(maximumYFromData * (index / PARTS)).toFixed(precision)}
        </text>
      );
    });
  };

  // Create lines for each data-series
  const chartSeries = data.map(({ legend, color, values }) => {
    const coords = values
      .map((dataPoint) => {
        const x = (dataPoint.x / maximumXFromData) * chartWidth + padding;
        const y = chartHeight - (dataPoint.y / maximumYFromData) * chartHeight + padding;
        return `${x}, ${y}`;
      })
      .join(' ');

    return { key: legend, color, coords };
  });

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <rect
        x={padding}
        y={padding}
        width={chartWidth}
        height={chartHeight}
        fill={colors.background}
      />
      <XAxis />
      <LabelsXAxis />
      <YAxis />
      <LabelsYAxis />
      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />

      {chartSeries.map(({ key, color, coords }) => (
        <polyline key={key} fill="none" stroke={color} strokeWidth={STROKE} points={coords} />
      ))}
    </svg>
  );
};

LineChart.defaultProps = {
  height: 200,
  width: 500,
  horizontalGuides: 4,
  verticalGuides: null,
  precision: 2,
  colors: {
    labels: '#ccc',
    axis: '#ccc',
    guides: '#ccc',
    line: 'hotpink',
    background: '#eee',
  },
};

LineChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      legend: PropTypes.string,
      color: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
      ),
    }),
  ).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  horizontalGuides: PropTypes.number,
  verticalGuides: PropTypes.number,
  precision: PropTypes.number,
  colors: PropTypes.objectOf(
    PropTypes.shape({
      labels: PropTypes.string,
      axis: PropTypes.string,
      guides: PropTypes.string,
      line: PropTypes.string,
      background: PropTypes.string,
    }),
  ),
};

export default LineChart;
