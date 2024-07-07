import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarAdmin from '../../components/Navbar_admin';
import Cancha from '../../components/Cancha';
import api from '../../api';

function Gestion_Canchas() {
  const [canchas, setCanchas] = useState([]);

  async function fetchCanchas() {
    try {
      const response = await api.get('/canchas');
      setCanchas(response.data.canchas);
    } catch (error) {
      console.error('Error fetching canchas', error);
    }
  }

  useEffect(() => {
    fetchCanchas();
  }, []);

  const handleDisableCancha = (canchaId) => {
    api.put(`/canchas/${canchaId}/disable`)
      .then(response => {
        const updatedCanchas = canchas.map(cancha => 
          cancha.id === canchaId ? { ...cancha, estado_disponibilidad: false } : cancha
        );
        setCanchas(updatedCanchas);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <NavbarAdmin />
      <div style={styles.container}>
        <h1 style={styles.title}>Gestión de Canchas</h1>
        <Link to="/admin/agregar" style={styles.addButton}>Agregar</Link>
        {canchas.map(cancha => (
          <Cancha key={cancha.id} cancha={cancha} onDisable={handleDisableCancha} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    display: 'inline-block',
  },
  addButton: {
    marginLeft: '20px',
    backgroundColor: '#7ec8e3',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
};

export default Gestion_Canchas;