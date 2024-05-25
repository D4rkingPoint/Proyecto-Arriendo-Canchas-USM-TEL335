import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../api'; // Asegúrate de tener configurado tu archivo API para manejar solicitudes

function Home_Usuario() {
  const [canchas, setCanchas] = useState([
    {
      id: 1,
      nombre: 'Cancha 1',
      descripcion: 'Cancha de fútbol 5 con césped sintético',
    },
    {
      id: 2,
      nombre: 'Cancha 2',
      descripcion: 'Cancha de baloncesto cubierta',
    },
  ]);
  const history = useHistory();

  useEffect(() => {
    async function fetchCanchas() {
      try {
        const response = await api.get('/canchas');
        setCanchas(response.data);
      } catch (error) {
        console.error('Error fetching canchas', error);
      }
    }

    fetchCanchas();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Selecciona tu cancha</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {canchas.map(cancha => (
            <div key={cancha.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
              <h3>{cancha.nombre}</h3>
              <p>{cancha.descripcion}</p>
              <button onClick={() => history.push(`/usuario/reservations/${cancha.id}`)}>Ir a cancha</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home_Usuario;
