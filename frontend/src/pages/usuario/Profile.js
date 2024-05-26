import React, { useState } from 'react';
import Navbar from '../../components/Navbar';

function Profile() {
  /** con las apis
   * function Profile() {
  const [activeReservations, setActiveReservations] = useState([]);
  const [reservationHistory, setReservationHistory] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const activeResponse = await api.get('/reservations/active');
        const historyResponse = await api.get('/reservations/history');
        setActiveReservations(activeResponse.data);
        setReservationHistory(historyResponse.data);
      } catch (error) {
        console.error('Error fetching reservations', error);
      }
    }

    fetchReservations();
  }, []);

  const cancelReservation = async (id) => {
    if (window.confirm('¿Está seguro de que desea cancelar la reserva?')) {
      try {
        await api.delete(`/reservations/${id}`);
        setActiveReservations(activeReservations.filter(res => res.id !== id));
        alert('Reserva cancelada con éxito');
      } catch (error) {
        console.error('Error canceling reservation', error);
      }
    }
  };
  */
  const [activeReservations, setActiveReservations] = useState([
    // Ejemplo de datos de reservaciones activas
    { id: 1, cancha: 'Cancha 1', fecha: '2024-05-25' },
    { id: 2, cancha: 'Cancha 2', fecha: '2024-05-26' },
  ]);

  const [reservationHistory, setReservationHistory] = useState([
    // Ejemplo de datos de historial de reservaciones
    { id: 1, cancha: 'Cancha 1', fecha: '2024-04-25', asistio: true },
    { id: 2, cancha: 'Cancha 2', fecha: '2024-04-26', asistio: false },
  ]);

  const cancelReservation = (id) => {
    if (window.confirm('¿Está seguro de que desea cancelar la reserva?')) {
      // Aquí iría la lógica para cancelar la reserva en la base de datos
      setActiveReservations(activeReservations.filter(res => res.id !== id));
      alert('Reserva cancelada con éxito');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ flex: 1, marginRight: '10px' }}>
          <h2>Reservaciones activas</h2>
          {activeReservations.length > 0 ? (
            activeReservations.map(res => (
              <div key={res.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <p>Cancha: {res.cancha}</p>
                <p>Fecha: {res.fecha}</p>
                <button onClick={() => cancelReservation(res.id)}>Cancelar reserva</button>
              </div>
            ))
          ) : (
            <p>No tienes reservaciones activas</p>
          )}
        </div>
        <div style={{ flex: 1, marginLeft: '10px' }}>
          <h2>Historial de reservaciones</h2>
          {reservationHistory.length > 0 ? (
            reservationHistory.map(res => (
              <div key={res.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', backgroundColor: res.asistio ? 'green' : 'red', color: 'white' }}>
                <p>Cancha: {res.cancha}</p>
                <p>Fecha: {res.fecha}</p>
                <p>Asistencia: {res.asistio ? 'Asistió' : 'No asistió'}</p>
              </div>
            ))
          ) : (
            <p>No tienes historial de reservaciones</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
