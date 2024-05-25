import React from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import NavbarAdmin from '../../components/Navbar_admin';

function Agregar() {
  return (
    <div>
      <NavbarAdmin />
      <div style={styles.container}>
        <h1>Agregar Cancha</h1>
        <input type="file" accept="image/*" style={styles.fileInput} />
        <input type="text" placeholder="Nombre de la Cancha" style={styles.input} />
        <input type="text" placeholder="Horario de Funcionamiento (Bloque 1 al 20)" style={styles.input} />
        <textarea placeholder="Detalles de la Cancha" style={styles.textArea}></textarea>
        <div style={styles.buttonContainer}>
          <button style={styles.confirmButton}>Agregar</button>
          <Link to="/admin/gestionCanchas" style={styles.cancelButton}>Cancelar</Link> {/* Utiliza el componente Link para crear el enlace */}
        </div>
      </div>
    </div>
  );
}

// Estilos
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px', // Establece el ancho máximo del contenedor
    margin: '0 auto', // Centra el contenedor horizontalmente
  },
  fileInput: {
    marginBottom: '10px',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box',
  },
  textArea: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    minHeight: '100px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  confirmButton: {
    backgroundColor: 'green',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none', // Agrega esta propiedad para eliminar la subrayado del enlace
  },
};

export default Agregar;
