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
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>
            Tipo:
            <select
              name="tipo"
              value={filters.tipo}
              onChange={handleFilterChange}
              style={{ marginLeft: '10px' }}
            >
              <option value="">Todos</option>
              <option value="futbol">Fútbol</option>
              <option value="basketball">Baloncesto</option>
              <option value="tenis">Tenis</option>
              <option value="padel">Pádel</option>
              {/* Añade más opciones según sea necesario */}
            </select>
          </label>
          <label style={{ marginRight: '10px' }}>
            Ubicación:
            <input
              type="text"
              name="ubicacion"
              value={filters.ubicacion}
              onChange={handleFilterChange}
              placeholder="Ingresa ubicación"
              style={{ marginLeft: '10px' }}
            />
          </label>
          <button onClick={fetchCanchas} style={{ marginLeft: '10px' }}>Filtrar</button>
        </div>
        {canchas.length === 0 ? (
          <p>No hay canchas disponibles.</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {canchas.map(cancha => (
              <div
                key={cancha.id}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '10px',
                  width: '200px',
                  textAlign: 'center'
                }}
              >
                <h3>{cancha.nombre}</h3>
                <p>{cancha.tipo}</p>
                <p>{cancha.ubicacion}</p>
                <button onClick={() => history.push(`/usuario/reservations/${cancha.id}`)}>
                  Ir a cancha
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home_Usuario;