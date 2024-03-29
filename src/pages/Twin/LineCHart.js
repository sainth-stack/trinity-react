import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      // display: false
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Day',
        color: 'black',
        fontWeight: 700,
        padding: 5
      },
      grid: {
        display: false,
      }
    },
    y: {
      title: {
        display: true,
        text: '',
        color: 'black',
        fontWeight: 700,
        padding: 5
      },
      grid: {
        display: false
      }
    }
  }
};

export function LineChart(props) {
  return <Line options={props.options ? props.options : options} data={props.data} height={props.height ? props.height : 80} width={props.width} />;
}