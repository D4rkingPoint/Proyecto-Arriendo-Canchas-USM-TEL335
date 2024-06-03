import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import api from '../../api';

function Reservations() {
  const { canchaId } = useParams();
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [horarios, setHorarios] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedBloque, setSelectedBloque] = useState(null);

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
          params: { canchaId, date: selectedDate.toISOString().split('T')[0] },
        });
        setReservations(response.data);
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
        await api.post('/reservations', {
          fecha: selectedDate.toISOString().split('T')[0],
          bloque: selectedBloque,
        });
        alert('Reservación exitosa. Se envió un correo con la confirmación de la reserva');
        history.push('/usuario/home_usuario');
      } catch (error) {
        console.error('Error making reservation', error);
      }
    }
  };

  const isBlockReserved = (bloque) => {
    return reservations.some(reservation => reservation.bloque === bloque);
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
                    const bloque = `${dia}-${blockIndex + 1}`;
                    const hasHorario = horarios.some(horario => horario.dia === dia && horario.bloque === `${blockIndex + 1}`);
                    const isReserved = isBlockReserved(bloque);
                    const isSelected = selectedBloque === bloque;
                    return (
                      <td
                        key={dayIndex + 1}
                        style={{
                          backgroundColor: isSelected ? 'green' : hasHorario ? 'yellow' : isReserved ? 'red' : 'white',
                          cursor: hasHorario && !isReserved ? 'pointer' : 'default',
                        }}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedBloque(null);
                          } else if (hasHorario && !isReserved) {
                            setSelectedBloque(bloque);
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