import React, { useState } from 'react';


function Cancha({ cancha }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Función para deshabilitar la cancha
  const handleDisableCancha = () => {
    setShowConfirmation(true);
  };

  // Función para confirmar la deshabilitación de la cancha
  const handleConfirmDisable = () => {
    // Lógica para deshabilitar la cancha
    console.log('Cancha deshabilitada:', cancha.nombre);
    setShowConfirmation(false);
  };

  // Función para cancelar la deshabilitación de la cancha
  const handleCancelDisable = () => {
    setShowConfirmation(false);
  };

  return (
    <div style={styles.container}>
      <div>
        <img src={cancha.imagen} alt={cancha.nombre} style={styles.image} />
      </div>
      <div style={styles.info}>
        <h2>{cancha.nombre}</h2>
        <p>Horario: {cancha.horario}</p>
        <p>Detalles: {cancha.detalles}</p>
        <p>Reservas: {cancha.reservas}</p>
      </div>
      <div style={styles.actions}>
        <button onClick={handleDisableCancha} style={styles.disableButton}>Deshabilitar</button>
      </div>
      {showConfirmation && (
        <div style={styles.confirmationPopup}>
          <p>¿Estás seguro de que deseas deshabilitar la cancha "{cancha.nombre}"?</p>
          <button onClick={handleConfirmDisable} style={styles.confirmButton}>Confirmar</button>
          <button onClick={handleCancelDisable} style={styles.cancelButton}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    marginBottom: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
    padding: '10px',
    alignItems: 'center',
  },
  image: {
    width: '200px',
    height: '150px',
    marginRight: '20px',
  },
  info: {
    flex: 1,
  },
  actions: {
    marginLeft: '20px',
  },
  disableButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  confirmationPopup: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    zIndex: '1000',
  },
  confirmButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Cancha;
