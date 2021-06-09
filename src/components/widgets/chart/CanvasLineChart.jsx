/* eslint no-param-reassign: ["error", { "props": false }] */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// CANVAS COMPONENT
const Canvas = ({ draw, ...rest }) => {
  const canvasRef = useRef(null);

  // Resizes the canvas based on pixel ratio and allowable size (set by CSS)
  const resizeCanvas = (canvas) => {
    const { width, height } = canvas.getBoundingClientRect();

    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio: ratio = 1 } = window;
      const context = canvas.getContext('2d');
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.scale(ratio, ratio);
      return true;
    }

    return false;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount += 1;
      resizeCanvas(canvas);
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...rest} />;
};

Canvas.propTypes = {
  draw: PropTypes.func.isRequired,
};

// LINE CHART COMPONENT
const CanvasLineChart = ({
  width,
  height,
  colors,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
  viewThreshold,
  labels,
  data,
}) => {
  // Main draw function
  const draw = (ctx, frameCount) => {
    // const maximumXFromData = Math.max(...data.map(({ values }) => values.map((v) => v.x)).flat());
    // const maximumYFromData = Math.max(...data.map(({ values }) => values.map((v) => v.y)).flat());

    const drawHorizontalGuides = () => {
      const startX = 0;
      const endX = width;

      // Generate an array of y-coordinates - the "height" of each horizontal line
      const guideCoordinates = new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
        const ratio = (index + 1) / numberOfHorizontalGuides;
        const yCoordinate = height - height * ratio;

        return yCoordinate;
      });

      // Styles
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = colors.guides;

      // Draw horizontal lines
      ctx.beginPath();

      guideCoordinates.forEach((coordinate) => {
        ctx.moveTo(startX, coordinate);
        ctx.lineTo(endX, coordinate);
      });

      // Finish the strokes
      ctx.stroke();
    };

    const drawVerticalGuides = () => {
      const guideCount = numberOfVerticalGuides || labels.length - 1;

      const startY = 0;
      const endY = height;

      const guideCoordinates = new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
        const ratio = (index + 1) / guideCount;
        const xCoordinate = ratio * width;

        return xCoordinate;
      });

      // Styles
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = colors.guides;

      guideCoordinates.forEach((coordinate) => {
        ctx.beginPath();
        ctx.moveTo(coordinate, startY);
        ctx.lineTo(coordinate, endY);
        ctx.stroke();
      });
    };

    const drawDataSeries = (series) => {
      const { color, values } = series;

      const maximumXFromData = Math.max(...data.map((s) => s.values.map((v) => v.x)).flat());
      const maximumYFromData = Math.max(...data.map((s) => s.values.map((v) => v.y)).flat());

      // Styles
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;

      // Begin drawing from the position of the first data point
      ctx.moveTo(values[0].x, values[0].y);
      ctx.beginPath();

      // DRAW!
      values.forEach((dataPoint) => {
        const x = (dataPoint.x / maximumXFromData) * width;
        const y = height - (dataPoint.y / maximumYFromData) * height;

        ctx.lineTo(x, y);
      });

      // Finish the strokes
      ctx.stroke();
    };

    const filterDataOnViewThreshold = (threshold = 10) => {
      return data.map((series) => {
        const length = series.values.length || 0;
        // If a view threshold was set, only show an this amount of data points
        if (threshold && length > threshold) {
          // Slice the values and get the returned array
          const values = series.values.slice(length - threshold, length);
          // Re-index X-values to cover the whole chart
          values.forEach((point, index) => {
            point.x = index;
          });
          // Return the sliced and re-indexed data-set
          return { ...series, values };
        }

        // No threshold, or threshold not met - return the series as-is
        return series;
      });
    };

    // Clear the old content of the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Create canvas background
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Check that we do in fact have data to draw
    if (data[0].values.length > 0) {
      // Create horizontal guides
      drawHorizontalGuides();
      // Create vertical guides
      drawVerticalGuides();

      // Filtering of dataset
      const filteredData = filterDataOnViewThreshold(viewThreshold);

      // Draw all data series
      filteredData.forEach((series) => {
        drawDataSeries(series);
      });
    } else {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'black';
      ctx.font = '30px Verdana';
      ctx.fillText('NO DATA', width / 2, height / 2);
    }

    // Draw random stuff to show things actually animate
    ctx.fillStyle = colors.guides;
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  return <Canvas draw={draw} style={{ height, width }} />;
};

CanvasLineChart.defaultProps = {
  viewThreshold: null,
  labels: [],
  height: 200,
  width: 500,
  horizontalGuides: 4,
  verticalGuides: null,
  colors: {
    labels: '#ccc',
    axis: '#ccc',
    guides: '#ccc',
    line: 'hotpink',
    background: '#eee',
  },
};

CanvasLineChart.propTypes = {
  viewThreshold: PropTypes.number,
  labels: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.number,
  width: PropTypes.number,
  horizontalGuides: PropTypes.number,
  verticalGuides: PropTypes.number,
  colors: PropTypes.objectOf(
    PropTypes.shape({
      labels: PropTypes.string,
      axis: PropTypes.string,
      guides: PropTypes.string,
      line: PropTypes.string,
      background: PropTypes.string,
    }),
  ),
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
};

export default CanvasLineChart;
