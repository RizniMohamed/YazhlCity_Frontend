import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/system';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const options = {
  options_revenue: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Revenue Vs Month',
      },
    },
  },
  options_room: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Filled room Vs Empty room',
      },
    },
  },
  options_Payment: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Paid persons Vs Unpaid persons',
      },
    },
  },
}

const data_revenue = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "Auguest", "September", "November", "December"],
  datasets: [
    {
      fill: true,
      label: 'Revenue (LKR)',
      data: [10, 20, 30, 40, 80, 10, 50, 80, 40, 5, 70, 90],
      borderColor: '#B4B4B4',
      backgroundColor: '#525151',
      hoverBackgroundColor: ['#FF8B03']
    },
  ],
};

const data_room = {
  labels: ['Filled', 'Empty',],
  datasets: [
    {
      data: [12, 19,],
      backgroundColor: ['#525151', '#E6E6E6'],
      borderColor: "#B4b4b4",
      borderWidth: 1,
      hoverBackgroundColor: ['#FF8B03']

    },
  ],
};

const data_payment = {
  labels: ['Paid', 'Unpaid'],
  datasets: [
    {
      data: [10, 20],
      backgroundColor: ['#525151', '#E6E6E6'],
      borderColor: "#B4b4b4",
      borderWidth: 1,
      hoverBackgroundColor: ['#FF8B03']
    },
  ],
};

const Dashbaord = () => {
  return (
    <>
      <Box display="flex" flexDirection="column" m="auto">
        <Box width={600} mt={4} m="auto" border="1px solid #525151">
          <Line options={options.options_revenue} data={data_revenue} redraw={true} />
        </Box>
        <Box display="flex" >
          <Box width={300} m={4} border="1px solid #525151">
            <Doughnut data={data_room} options={options.options_room} />
          </Box>
          <Box width={300} m={4} border="1px solid #525151">
            <Doughnut data={data_payment} options={options.options_Payment} />
          </Box>
        </Box>
      </Box>
    </>
  )
}


export default Dashbaord