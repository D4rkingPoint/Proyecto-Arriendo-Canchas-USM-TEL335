import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/Navbar_admin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays } from 'date-fns';

function Estadisticas_Administrador() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPieDate, setSelectedPieDate] = useState(new Date());

  // Dummy data for demonstration
  const horarioData = [
    ['Horario', 'Reservas'],
    ['1-2', 10],
    ['3-4', 15],
    ['5-6', 20],
    ['7-8', 25],
    ['9-10', 30],
    ['11-12', 35],
    ['13-14', 40],
    ['15-16', 45],
    ['17-18', 50],
    ['19-20', 55],
  ];

  const frecuenciaData = [
    ['Día', 'Reservas'],
    ['Lunes', 40],
    ['Martes', 30],
    ['Miércoles', 20],
    ['Jueves', 27],
    ['Viernes', 18],
    ['Sábado', 23],
    ['Domingo', 34],
  ];

  const pieData = [
    ['Cancha', 'Reservas'],
    ['Cancha 1', 400],
    ['Cancha 2', 300],
    ['Cancha 3', 300],
    ['Cancha 4', 200],
  ];

  useEffect(() => {
    // Load the Google Charts library
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = () => {
      window.google.charts.load('current', { packages: ['corechart', 'bar'] });
      window.google.charts.setOnLoadCallback(drawCharts);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const drawCharts = () => {
    drawLineChart();
    drawBarChart();
    drawPieChart();
  };

  const drawLineChart = () => {
    const data = window.google.visualization.arrayToDataTable(horarioData);
    const options = {
      title: 'Horarios Preferidos en el Día',
      hAxis: { title: 'Horario' },
      vAxis: { title: 'Reservas' },
      chartArea: { width: '70%', height: '70%' } // Ajuste del área del gráfico
    };
    const chart = new window.google.visualization.LineChart(document.getElementById('line_chart'));
    chart.draw(data, options);
  };

  const drawBarChart = () => {
    const data = window.google.visualization.arrayToDataTable(frecuenciaData);
    const options = {
      title: 'Frecuencia de Reservas por Días de la Semana',
      hAxis: { title: 'Día' },
      vAxis: { title: 'Reservas' },
      chartArea: { width: '70%', height: '70%' } // Ajuste del área del gráfico
    };
    const chart = new window.google.visualization.ColumnChart(document.getElementById('bar_chart'));
    chart.draw(data, options);
  };

  const drawPieChart = () => {
    const data = window.google.visualization.arrayToDataTable(pieData);
    const options = {
      title: 'Cancha con Mayor Preferencia por Día',
      chartArea: { width: '70%', height: '70%' } // Ajuste del área del gráfico
    };
    const chart = new window.google.visualization.PieChart(document.getElementById('pie_chart'));
    chart.draw(data, options);
  };

  return (
    <div>
      <NavbarAdmin />
      <div style={{ padding: '20px' }}>
        <h2>Estadísticas del Administrador</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3>Seleccionar día para estadísticas</h3>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            maxDate={addDays(new Date(), -1)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h3>Horarios Preferidos en el Día</h3>
            <div id="line_chart" style={{ width: '100%', height: 'auto' }}></div>
          </div>

          <div>
            <h3>Frecuencia de Reservas por Días de la Semana</h3>
            <div id="bar_chart" style={{ width: '100%', height: 'auto' }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Cancha con Mayor Preferencia por Día</h3>
          <DatePicker
            selected={selectedPieDate}
            onChange={(date) => setSelectedPieDate(date)}
            maxDate={addDays(new Date(), -1)}
            dateFormat="yyyy-MM-dd"
          />
          <div id="pie_chart" style={{ width: '100%', height: 'auto', maxWidth: '600px', marginTop: '20px' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas_Administrador;