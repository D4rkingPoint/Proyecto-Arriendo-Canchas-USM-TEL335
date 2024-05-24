import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api'
import Logo from '../../styles/img/Logo_UTFSM.png';
import Navbar from '../../components/Navbar';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [sport, setSport] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const history = useHistory();

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  const containerStyle = {
    border: '1px solid #000',
    padding: '20px',
    height: 'auto',
    backgroundColor: 'whitesmoke',
    marginTop: '0px',
    position: 'relative',
  };

  const logoStyle = {
    width: '150px',
    position: 'absolute',
    top: '10px',
    left: '10px',
  };

  const logoutButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    backgroundColor: 'floralwhite',
    color: 'black',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  };

  return (
    <div>
      <Navbar />
      <div style={containerStyle}>
        <button style={logoutButtonStyle} onClick={handleLogout}>Cerrar sesión</button>
        <h1>Reservaciones</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>
                    Deporte:
                    <select value={sport} onChange={(e) => setSport(e.target.value)} required>
                      <option value="" disabled>Selecciona un deporte</option>
                      <option value="Fútbol">Fútbol</option>
                      <option value="Baloncesto">Bascketball</option>
                    </select>
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Hora de inicio:
                    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Hora de fin:
                    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <button type="submit" onClick={handleSubmit} style={{ width: '100%' }}>
          Envía tu reserva para ser procesada
        </button>
        <h3>Reservaciones existentes</h3>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id}>
              {reservation.sport} - {new Date(reservation.start_time).toLocaleString()} a {new Date(reservation.end_time).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Reservations;
