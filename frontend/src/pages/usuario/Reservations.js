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
  const [bloques, setBloques] = useState([]);
  const [selectedBloque, setSelectedBloque] = useState(null);

  useEffect(() => {
    async function fetchBloques() {
      try {
        const response = await api.get(`/reservations/${canchaId}/bloques`, {
          params: { date: selectedDate.toISOString().split('T')[0] },
        });
        setBloques(response.data);
      } catch (error) {
        console.error('Error fetching bloques', error);
      }
    }

    fetchBloques();
  }, [selectedDate, canchaId]);

  const handleReservation = () => {
    if (window.confirm('¿Estás seguro de que deseas realizar la reserva de esta cancha?')) {
      try {
        // Aquí iría la lógica para hacer la reserva en la base de datos
        alert('Reservación exitosa. Se envió un correo con la confirmación de la reserva');
        // Aquí podrías redirigir a otra página o actualizar el estado según sea necesario
      } catch (error) {
        console.error('Error making reservation', error);
      }
    }
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
          {bloques.map(bloque => (
            <div
              key={bloque.id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                cursor: 'pointer',
                backgroundColor: bloque.reservado ? 'red' : selectedBloque === bloque.id ? 'green' : 'white',
              }}
              onClick={() => !bloque.reservado && setSelectedBloque(bloque.id)}
            >
              {bloque.horaInicio} - {bloque.horaFin}
            </div>
          ))}
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

export default Reservations;
