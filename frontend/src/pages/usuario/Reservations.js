import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DatePicker from 'react-datepicker';
import { startOfWeek, addDays, format, setDay } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api';

function Reservations() {
  const { canchaId } = useParams();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [horarios, setHorarios] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedBloque, setSelectedBloque] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  useEffect(() => {
    async function fetchHorarios() {
      try {
        const response = await api.get(`/horariosCancha`, {
          params: { canchaId },
        });
        setHorarios(response.data);
      } catch (error) {
        console.error('Error fetching horarios', error);
      }
    }

    async function fetchReservations() {
      try {
        const response = await api.get(`/reservations`, {
          params: { canchaId, fecha: selectedDate.toISOString().split('T')[0] },
        });
        setReservations(response.data.reservas);
      } catch (error) {
        console.error('Error fetching reservations', error);
      }
    }

    fetchHorarios();
    fetchReservations();
  }, [selectedDate, canchaId]);

  const handleReservation = async () => {
    if (selectedBloque && window.confirm('¿Estás seguro de que deseas realizar la reserva de esta cancha?')) {
      try {
        const dayOfWeek = selectedDayIndex+1; // 0 for Sunday, 1 for Monday, etc.
        const newDate = setDay(selectedDate, dayOfWeek, { weekStartsOn: 1 }); // Setting the day of the week
        const formattedDate = format(newDate, 'yyyy-MM-dd');
        await api.post('/reservar', {
          fecha: formattedDate,
          bloque: selectedBloque+1,
          canchaId: canchaId
        });
        alert('Reservación exitosa. Se envió un correo con la confirmación de la reserva');
        history.push('/usuario/home_usuario');
      } catch (error) {
        console.error('Error making reservation', error);
      }
    }
  };

  const isBlockReserved = (bloque, day) => {
    const newDate = setDay(selectedDate, day, { weekStartsOn: 1 });
    const formattedDate = format(newDate, 'yyyy-MM-dd');
    return reservations.some(reservation => reservation.bloque === `${bloque}` && reservation.fecha === formattedDate && reservation.estado !== 'Anulada');
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Reservar Cancha</h1>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          showWeekNumbers

        />
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Bloque</th>
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map((day, index) => (
                  <th key={index}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, blockIndex) => (
                <tr key={blockIndex + 1}>
                  <td>{blockIndex * 2 + 1}-{blockIndex * 2 + 2}</td>
                  {[...Array(7)].map((_, dayIndex) => {
                    const dia = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][dayIndex];
                    const hasHorario = horarios.some(horario => horario.dia === dia && horario.bloque === `${blockIndex + 1}`);
                    const isReserved = isBlockReserved(blockIndex + 1, dayIndex + 1);
                    const isSelected = selectedBloque === blockIndex && selectedDayIndex === dayIndex;
                    
                    let backgroundColor = 'white';
                    if (isReserved) {
                      backgroundColor = 'red';
                    } else if (isSelected) {
                      backgroundColor = 'green';
                    } else if (hasHorario) {
                      backgroundColor = 'yellow';
                    }

                    return (
                      <td
                        key={dayIndex + 1}
                        style={{
                          backgroundColor: backgroundColor,
                          cursor: hasHorario && !isReserved ? 'pointer' : 'default',
                        }}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedBloque(null);
                            setSelectedDayIndex(null);
                          } else if (hasHorario && !isReserved) {
                            setSelectedBloque(blockIndex);
                            setSelectedDayIndex(dayIndex);
                          }
                        }}
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleReservation} style={{ marginTop: '20px' }}>
          Confirmar Reserva
        </button>
        <button onClick={() => history.push('/usuario/home_usuario')} style={{ marginTop: '20px' }}>
          Volver a seleccionar otra cancha
        </button>
      </div>
    </div>
  );
}

// Estilos
const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
};

export default Reservations;