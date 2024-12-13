// src/components/ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const Usage = () => {
  // Chart data and options
  const data = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1), // Days of the month
    datasets: [
      {
        label: 'Usage',
        data: [20, 40, 35, 50, 55, 40, 60, 70, 80, 60, 55, 40, 30, 70, 80, 60, 75, 50, 40, 30, 50, 60, 75, 70, 60, 50, 40, 60, 80, 70, 60],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)', // light blue fill
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#2563eb',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#2563eb',
        titleColor: '#fff',
        bodyColor: '#fff',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)', // gray-200 for grid lines
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4"> {/* Flex container for title and dropdown */}
        <h3 className="text-lg font-semibold">Monthly Overview</h3>
        <select className="bg-gray-100 text-gray-600 p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-300">
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </select>
      </div>
      
      <div className=" h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Usage;
