import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import NavbarAdmin from '../../components/Navbar_admin';
import Cancha from '../../components/Cancha';

function Gestion_Canchas() {
  // Datos simulados de las canchas
  const [canchas, setCanchas] = useState([
    {
      id: 1,
      nombre: 'Cancha 1',
      imagen: 'cancha1.jpg',
      horario: '9:00 - 18:00',
      detalles: 'Césped sintético, iluminación LED',
      reservas: 15
    },
    {
      id: 2,
      nombre: 'Cancha 2',
      imagen: 'cancha2.jpg',
      horario: '10:00 - 20:00',
      detalles: 'Césped natural, gradas disponibles',
      reservas: 12
    }
  ]);

  return (
    <div>
      <NavbarAdmin />
      <div style={styles.container}>
        <h1 style={styles.title}>Gestión de Canchas</h1>
        <Link to="/admin/agregar" style={styles.addButton}>Agregar</Link> {/* Utiliza el componente Link para crear el enlace */}
        {canchas.map(cancha => (
          <Cancha key={cancha.id} cancha={cancha} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px', // Establece el ancho máximo del contenedor
    margin: '0 auto', // Centra el contenedor horizontalmente
  },
  title: {
    display: 'inline-block', // Asegura que el título y el botón se muestren en la misma línea
  },
  addButton: {
    marginLeft: '20px', // Agrega un margen izquierdo para separar el botón del título
    backgroundColor: '#7ec8e3',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none', // Agrega esta propiedad para eliminar la subrayado del enlace
  },
};

export default Gestion_Canchas;
