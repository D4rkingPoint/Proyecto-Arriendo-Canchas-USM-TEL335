import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../api'; // Asegúrate de tener configurado tu archivo API para manejar solicitudes

function Home_Usuario() {
  const [canchas, setCanchas] = useState([]);
  const [filters, setFilters] = useState({ tipo: '', ubicacion: '' });

  const history = useHistory();

  async function fetchCanchas() {
    try {
      const response = await api.get('/canchas', { params: filters });
      setCanchas(response.data.canchas);
    } catch (error) {
      console.error('Error fetching canchas', error);
    }
  }

  useEffect(() => {
    
    fetchCanchas();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Selecciona tu cancha</h1>
        <div>
          <label>
            Tipo:
            <input
              type="text"
              name="tipo"
              value={filters.tipo}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Ubicación:
            <input
              type="text"
              name="ubicacion"
              value={filters.ubicacion}
              onChange={handleFilterChange}
            />
          </label>
          <button onClick={fetchCanchas}>Filtrar</button>
        </div>
        {canchas.length === 0 ? (
          <p>No hay canchas disponibles.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {canchas.map(cancha => (
              <div key={cancha.id} style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                <h3>{cancha.nombre}</h3>
                <p>{cancha.tipo}</p>
                <button onClick={() => history.push(`/usuario/reservations/${cancha.id}`)}>Ir a cancha</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home_Usuario;