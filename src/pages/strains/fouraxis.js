import React from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadarController, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(RadarController, Tooltip, Legend, Filler);

const FourAxisChart = () => {
  // Original data and their respective min/max ranges
  const originalData = {
    PPFD: { value: 2000, min: 0, max: 2000 },
    Temp: { value: 50, min: 0, max: 100 },
    PPM: { value: 2000, min: 0, max: 2000 },
    Hum: { value: 50, min: 0, max: 100 },
  };

  // Normalize data to a 0-100 range
  const normalize = (value, min, max) => ((value - min) / (max - min)) * 100;

  const data = {
    labels: ['PPFD', 'Temp', 'PPM', 'Hum'],
    datasets: [
      {
        label: 'Room 1, All',
        data: [
          normalize(originalData.PPFD.value, originalData.PPFD.min, originalData.PPFD.max),
          normalize(originalData.Temp.value, originalData.Temp.min, originalData.Temp.max),
          normalize(originalData.PPM.value, originalData.PPM.min, originalData.PPM.max),
          normalize(originalData.Hum.value, originalData.Hum.min, originalData.Hum.max),
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
        pointStyle: 'rectRot', // Diamond shape
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            // Custom tick labels for specific ranges
            if (value === 0) return '0';
            if (value === 25) return '500';
            if (value === 50) return '1000';
            if (value === 75) return '1500';
            if (value === 100) return '2000';
            return value;
          },
          stepSize: 25, // Adjust the step size to match your intervals
        },
        pointLabels: {
          fontSize: 14,
          callback: function (value) {
            const axisMin = originalData[value].min;
            const axisMax = originalData[value].max;
            return `${value} (${axisMin}-${axisMax})`;
          },
        },
        angleLines: {
          display: true,
        },
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const datasetLabel = context.dataset.label || '';
            const value = context.raw;
            const originalValue = Object.values(originalData)[context.dataIndex].value;
            return `${datasetLabel}: ${originalValue} (${value.toFixed(2)})`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Room 1</h2>
      <Radar data={data} options={options} />
    </div>
  );
};

export default FourAxisChart;
