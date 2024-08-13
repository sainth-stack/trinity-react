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
        text: 'Date',
        color: 'black',
        fontWeight: 700,
        padding: 5
      },
      grid: {
        display: false,
      }
    },
    y: {
      min: 0,
      position: 'left',
      title: {
        display: true,
        text: 'Temperature & Humidity',
        color: 'black',
        fontWeight: 700,
        padding: 5
      },
      ticks: {
        // stepSize: 1000// <----- This prop sets the stepSize
      }
    },
    // y1: {
    //     min: 0,
    //     display: true,
    //     position: 'right',
    //     title: {
    //         display: true,
    //         text: 'Temperature & humidity',
    //         color: 'black',
    //         fontWeight: 700,
    //         padding: 5
    //     },
    //   },
  }
};

const getOptions = (data) => {
  const d1 = data?.datasets?.some((dataset) => {
    return dataset.yAxisID === 'y' && !dataset.hidden
  })
  const d2 = data?.datasets?.some((dataset) => dataset.yAxisID === 'y1' && (!dataset.hidden))
  const vpd=data?.datasets?.some((dataset) => {
    return dataset.label === 'VPD' && (dataset.hidden)
  })
  console.log(vpd)
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        display: false
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
          text: 'Date',
          color: 'black',
          fontWeight: 700,
          padding: 5
        },
        grid: {
          display: false,
        }
      },
      y: {
        min: 0,
        position: 'right',
        title: {
          display: true,
          text: !vpd ? "VPD" : 'CO2 & LSI',
          color: 'black',
          fontWeight: 700,
          padding: 5
        },
      },
      y1: {
        min: 0,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature & humidity',
          color: 'black',
          fontWeight: 700,
          padding: 5
        },
        display: d2,
      },
    }
  };
}


export function LineChart(props) {

  return <Line options={props.options === true ? getOptions(props.data) : props.options} data={props.data} height={props.height ? props.height : 80} width={props.width} />;
}