import React, { useState, useEffect } from 'react';
import api from '../api';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [sport, setSport] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const result = await api.get('/reservations');
        setReservations(result.data);
      } catch (error) {
        console.error("No se han podido obtener reservas", error);
      }
    };
    fetchReservations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/reservations', {
        sport,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
      });
      setSport("");
      setStartTime("");
      setEndTime("");
      // Refetch reservations after creating a new one
      const result = await api.get('/reservations');
      setReservations(result.data);
    } catch (error) {
      console.error("Error en la creación de la reserva", error);
    }
  };

  return (
    <div>
      <h2>Reservations</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Sport:
          <input type="text" value={sport} onChange={(e) => setSport(e.target.value)} required />
        </label>
        <label>
          Start Time:
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </label>
        <label>
          End Time:
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </label>
        <button type="submit">Create Reservation</button>
      </form>
      <h3>Existing Reservations</h3>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.id}>
            {reservation.sport} - {new Date(reservation.start_time).toLocaleString()} to {new Date(reservation.end_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Reservations;