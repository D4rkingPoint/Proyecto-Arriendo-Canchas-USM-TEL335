import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, format } from 'date-fns';
import api from '../api';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const getBlockRanges = () => {
  let blocks = [];
  for (let i = 1; i <= 16; i += 2) {
    blocks.push(`${i}-${i + 1}`);
  }
  return blocks;
};

const PreferenceTable = ({ data, error }) => {
  const [reservationData, setReservationData] = useState(data || []);
  const [tableError, setTableError] = useState(error);

  const getPercentage = (block, day) => {
    const reservation = reservationData.find(
      (res) => res.bloque === `${block}` && res.dia === day.toLowerCase()
    );
    return reservation ? `${reservation.percentage}%` : '0.00%';
  };

  const getColor = (percentage) => {
    const value = parseFloat(percentage);
    const green = Math.floor((255 * value) / 100);
    const pivot = 255 - green;
    return `rgb(${pivot}, ${255}, ${pivot})`;
  };

  return (
    <div style={{ padding: '20px' }}>
      {tableError ? (
        <div style={{ color: 'red' }}>{tableError}</div>
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
                      padding: '5px',
                      fontSize: '14px',
                    }}>
                    {block}
                  </td>
                  {daysOfWeek.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      style={{
                        backgroundColor: getColor(getPercentage(block, day).replace('%', '')),
                        textAlign: 'center',
                        padding: '5px',
                        fontSize: '14px',
                      }}
                    >
                      {getPercentage(block, day)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};

export default PreferenceTable;
