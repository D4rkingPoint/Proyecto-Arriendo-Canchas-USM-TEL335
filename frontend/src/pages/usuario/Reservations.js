import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { startOfWeek, addDays, format, setDay } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api';

// Registrar la configuración regional
registerLocale('es', es);

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
        error('Error fetching horarios', error);
      }
    }

    async function fetchReservations() {
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await api.get(`/reservations`, {
          params: { canchaId, fecha: formattedDate },
        });
        setReservations(response.data.reservations);
      } catch (error) {
        console.error('Error fetching reservations', error);
      }
    }

    fetchHorarios();
    fetchReservations();
  }, [selectedDate, canchaId]);

  const handleReservation = async () => {
    if (Number.isInteger(selectedBloque)) {
      const dayOfWeek = selectedDayIndex + 1;
      const newDate = setDay(selectedDate, dayOfWeek, { weekStartsOn: 0 }); 
      const formattedDate = format(newDate, 'yyyy-MM-dd');
      const today = new Date();
      const formattedToday = format(today, 'yyyy-MM-dd');
      
      if (formattedDate < formattedToday) {
        alert('No se puede realizar una reserva para una fecha anterior a la fecha actual.');
        return;
      }
  
      if (window.confirm('¿Estás seguro de que deseas realizar la reserva de esta cancha?')) {
        try {
          await api.post('/reservar', {
            fecha: formattedDate,
            bloque: selectedBloque + 1,
            canchaId: canchaId
          });
          alert('Reservación exitosa. Se envió un correo con la confirmación de la reserva.');
          history.push('/usuario/home_usuario');
        } catch (error) {
          console.error('Error making reservation', error);
        }
      }
    }
  };

  const isBlockReserved = (bloque, day) => {
    const newDate = setDay(selectedDate, day, { weekStartsOn: 0 });
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
          onChange={date => {setSelectedDate(date)}}
          dateFormat="yyyy-MM-dd"
          showWeekNumbers
          locale="es"
          calendarStartDay={1}
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
