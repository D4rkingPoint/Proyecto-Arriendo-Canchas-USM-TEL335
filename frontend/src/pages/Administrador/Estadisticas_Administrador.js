import React, { useState, useEffect } from 'react';
import NavbarAdmin from '../../components/Navbar_admin';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format } from 'date-fns';
import api from '../../api';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

const getBlockRanges = () => {
  let blocks = [];
  for (let i = 1; i <= 16; i += 2) {
    blocks.push(`${i}-${i + 1}`);
  }
  return blocks;
};

function Estadisticas_Administrador() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 7));
  const [reservationData, setReservationData] = useState([]);
  const [error, setError] = useState(null);

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
        console.log(reservationData);
      } catch (error) {
        setError(error.message);
        console.error(error);
      }
    };

    fetchReservationData();
  }, [startDate, endDate]);

  const getPercentage = (block, day) => {
    const reservation = reservationData.find(
      (res) => res.bloque === `${block}` && res.dia === day.toLowerCase()
    );
    return reservation ? `${reservation.percentage}%` : '0.00%';
  };

  return (
    <div>
      <NavbarAdmin />
      <div style={{ padding: '20px'}}>
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

        {error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Bloque</th>
                  {daysOfWeek.map((day, index) => (
                    <th key={index}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getBlockRanges().map((block, blockIndex) => (
                  <tr key={blockIndex}>
                    <td 
                      style={{
                        textAlign: 'center',
                        padding: '5px', // Reduce padding to make cells smaller
                        fontSize: '14px', // Reduce font size to make text smaller
                      }}>{block}</td>
                    {daysOfWeek.map((day, dayIndex) => (
                      <td
                        key={dayIndex}
                        style={{
                          backgroundColor: getColor(getPercentage(blockIndex + 1, day).replace('%', '')),
                          textAlign: 'center',
                          padding: '5px', // Reduce padding to make cells smaller
                          fontSize: '14px', // Reduce font size to make text smaller
                        }}
                      >
                        {getPercentage(blockIndex + 1, day)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    width: '30%',
    borderCollapse: 'collapse',
  },
};

const getColor = (percentage) => {
  const value = parseFloat(percentage);
  const green = Math.floor((255 * value) / 100);
  const pivote = 255 - green;
  return `rgb(${pivote}, ${255 }, ${pivote})`;
};

export default Estadisticas_Administrador;
