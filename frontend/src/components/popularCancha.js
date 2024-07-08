import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const ReservationStatsPieCharts = ({ data, error }) => {
  const [chartsData, setChartsData] = useState(data);
  const [chartError, setChartError] = useState(error);

  const getChartData = (state) => ({
    labels: chartsData[state].labels,
    datasets: [{
      data: chartsData[state].data,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverOffset: 4
    }]
  });

  const getChartOptions = () => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.raw / total) * 100).toFixed(2);
            return `${context.label}: ${percentage}%`;
          }
        }
      }
    }
  });

  return (
    <div>
      <h2>Estadísticas de Reservas</h2>
      {chartError ? (
        <div style={{ color: 'red' }}>{chartError}</div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '10rem', height: '10rem', margin: '0 1rem' }}>
            <h3>Sin Confirmar</h3>
            <Pie data={getChartData('sinConfirmar')} options={getChartOptions()} />
          </div>
          <div style={{ width: '10rem', height: '10rem', margin: '0 1rem' }}>
            <h3>Confirmada</h3>
            <Pie data={getChartData('confirmada')} options={getChartOptions()} />
          </div>
          <div style={{ width: '10rem', height: '10rem', margin: '0 1rem' }}>
            <h3>Anulada</h3>
            <Pie data={getChartData('anulada')} options={getChartOptions()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationStatsPieCharts;
