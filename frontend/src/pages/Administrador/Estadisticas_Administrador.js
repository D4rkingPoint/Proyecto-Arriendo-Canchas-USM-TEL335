import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format } from 'date-fns';
import api from '../../api';
import NavbarAdmin from '../../components/Navbar_admin';
import 'react-datepicker/dist/react-datepicker.css';
import PreferenceTable from '../../components/prefenceTable';
import ReservationStatsPieChart from '../../components/popularCancha';

function Estadisticas_Administrador() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 7));
  const [reservationData, setReservationData] = useState([]);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [chartsData, setChartsData] = useState({
    sinConfirmar: { labels: [], data: [] },
    confirmada: { labels: [], data: [] },
    anulada: { labels: [], data: [] }
  });

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await api.get('/estadisticas/horario', { 
          params: { 
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd')
          } 
        });
        setReservationData(response.data);
      } catch (error) {
        setError1(error.message);
        console.error(error);
      }
    };

    fetchReservationData();


    const fetchReservationStats = async () => {
      try {
        const response = await api.get('/estadisticas/reservas', {
          params: {
            startDate: format(startDate, 'yyyy-MM-dd'),
            endDate: format(endDate, 'yyyy-MM-dd')
          }
        });

        const stats = response.data.stats;

        const stateData = {
          sinConfirmar: { labels: [], data: [] },
          confirmada: { labels: [], data: [] },
          anulada: { labels: [], data: [] }
        };

        Object.keys(stats).forEach(canchaId => {
          const cancha = stats[canchaId];
          stateData.sinConfirmar.labels.push(cancha.nombre);
          stateData.sinConfirmar.data.push(cancha.sinConfirmar);

          stateData.confirmada.labels.push(cancha.nombre);
          stateData.confirmada.data.push(cancha.confirmada);

          stateData.anulada.labels.push(cancha.nombre);
          stateData.anulada.data.push(cancha.anulada);
        });
        setChartsData(stateData);
      } catch (error) {
        setError2(error.message);
        console.error(error);
      }
    };

    fetchReservationStats();
  }, [startDate, endDate]);

  return (
    <div>
      <NavbarAdmin />
      <div style={{ padding: '20px' }}>
        <h2>Estadísticas del Administrador</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3>Seleccionar rango de fechas para estadísticas</h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, marginRight: '10px' }}>
            <PreferenceTable data={reservationData} error={error1} />
          </div>
          <div style={{ flex: 1, marginLeft: '10px' }}>
            <ReservationStatsPieChart data={chartsData} endDate={error2} />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Estadisticas_Administrador;
