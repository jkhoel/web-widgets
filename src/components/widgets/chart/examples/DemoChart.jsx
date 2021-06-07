import React from 'react';
import LineChart from '../LineChart';

const data = [
  { label: 'SU', x: 0, y: 0 },
  { label: 'M', x: 1, y: 400 },
  { label: 'T', x: 2, y: 300 },
  { label: 'W', x: 3, y: 100 },
  { label: 'TH', x: 4, y: 400 },
  { label: 'F', x: 5, y: 500 },
  { label: 'SA', x: 6, y: 400 },
];

const styles = {
  chartComponentsContainer: {
    display: 'grid',
    gridTemplateColumns: 'max-content 700px',
    alignItems: 'center',
  },
  chartWrapper: { maxWidth: 700, alignSelf: 'flex-start' },
};

function DemoChart() {
  return (
    <div style={styles.chartComponentsContainer}>
      <div />
      <div style={styles.chartWrapper}>
        <LineChart data={data} />
      </div>
    </div>
  );
}

export default DemoChart;
