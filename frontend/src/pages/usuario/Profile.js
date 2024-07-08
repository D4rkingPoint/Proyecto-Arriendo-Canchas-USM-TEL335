import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api';

function Profile() {
  const [activeReservations, setActiveReservations] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [loading, setLoading] = useState(true); // Añadir estado de carga
  const [error, setError] = useState(null); // Añadir estado de error

  useEffect(() => {
    async function fetchReservations() {
      setLoading(true);
      setError(null);

      try {
        const unconfirmedResponse = await api.get('/reservations', {
          params: { estado: 'Sin Confirmar' }
        });
        setActiveReservations(unconfirmedResponse.data.reservations);
        console.log(activeReservations)
      } catch (error) {
        console.error('Error fetching unconfirmed reservations', error);
      }

      try {
        const confirmedResponse = await api.get('/reservations', {
          params: { estado: 'Confirmada' }
        });
        setConfirmedReservations(confirmedResponse.data.reservations);
      } catch (error) {
        console.error('Error fetching confirmed reservations', error);
      }

      try {
        const cancelledResponse = await api.get('/reservations', {
          params: { estado: 'Anulada' }
        });
        setCancelledReservations(cancelledResponse.data.reservations  );
      } catch (error) {
        console.error('Error fetching cancelled reservations', error);
      }

      setLoading(false);
    }

    fetchReservations();
  }, []); 

  const cancelReservation = async (id) => {
    if (window.confirm('¿Está seguro de que desea cancelar la reserva?')) {
      try {
        await api.delete(`/reservations/${id}`);
        alert('Reserva cancelada con éxito');
        window.location.reload();
      } catch (error) {
        console.error('Error canceling reservation', error);
      }
    }
  };

  const confirmReservation = async (token) => {
    console.log(token)
    if (window.confirm('¿Está seguro de que desea confirmar la reserva?')) {
      try {
        await api.get(`/confirm/${token}`);
        alert('Reserva confirmada con éxito');
        window.location.reload();
      } catch (error) {
        console.error('Error confirming reservation', error);
      }
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        {/* Reservaciones no confirmadas */}
        
        <div style={{flex:1}}>
          <h2>Reservaciones no confirmadas</h2>
          <div style={{ flex: 1, marginRight: '10px', maxHeight: '400px', overflow: 'auto' }}>
            {activeReservations.length > 0 ? (
              activeReservations.map(res => (
                <div key={res.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', background: 'white' }}>
                  <p>{res.cancha.nombre}</p>
                  <p>Fecha: {res.fecha}</p>
                  <button onClick={() => cancelReservation(res.id)}>Cancelar reserva</button>
                  <button onClick={() => confirmReservation(res.confirmationToken)}>Confirmar reserva</button>
                </div>
              ))
            ) : (
              <p>No tienes reservaciones no confirmadas</p>
            )}
          </div>
        </div>

        {/* Reservaciones confirmadas */}
        <div style={{flex:1}}>
          <h2>Reservaciones confirmadas</h2>
          <div style={{ flex: 1, marginLeft: '10px', maxHeight: '400px', overflow: 'auto' }}>
            
            {confirmedReservations.length > 0 ? (
              confirmedReservations.map(res => (
                <div key={res.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', backgroundColor: 'green', color: 'white' }}>
                  <p>{res.cancha.nombre}</p>
                  <p>Fecha: {res.fecha}</p>
                  <p>Estado: Confirmada</p>
                </div>
              ))
            ) : (
              <p>No tienes reservaciones confirmadas</p>
            )}
          </div>
        </div>
        

        {/* Reservaciones anuladas */}
        <div style={{flex:1}}>
          <h2>Reservaciones anuladas</h2>
          <div style={{ flex: 1, marginLeft: '10px', maxHeight: '400px', overflow: 'auto' }}>
            
            {cancelledReservations.length > 0 ? (
              cancelledReservations.map(res => (
                <div key={res.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', backgroundColor: 'red', color: 'white' }}>
                  <p>{res.cancha.nombre}</p>
                  <p>Fecha: {res.fecha}</p>
                  <p>Estado: Anulada</p>
                </div>
              ))
            ) : (
              <p>No tienes reservaciones anuladas</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
