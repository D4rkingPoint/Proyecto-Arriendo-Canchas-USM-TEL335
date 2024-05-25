import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
//import api from '../api';
import Logo from '../styles/img/Logo_UTFSM.png';

function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Lógica para enviar solicitud de recuperación de contraseña
      // await api.post('/auth/password-recovery', { email });
      // Lógica para manejar la respuesta de la solicitud de recuperación de contraseña
      history.push('/login');
    } catch (error) {
      console.error("Solicitud de recuperación de contraseña fallida", error);
    }
  };

  const containerStyle = {
    border: '1px solid #000',
    padding: '20px',
    height: 'auto',
    backgroundColor: 'whitesmoke',
    marginTop: '20px',  // Ajustar el margen superior para separar del logo
    width: '300px',     // Ajustar el ancho del contenedor
    margin: '20px auto', // Centrar el contenedor horizontalmente
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' // Añadir sombra para mejorar la apariencia
  };

  const logoStyle = {
    display: 'block',
    margin: '0 auto',
    maxWidth: '200px',
    height: 'auto',
    marginTop: '20px'
  };

  const inputAndButtonStyle = {
    width: '100%',
    marginBottom: '10px'
  };

  return (
    <div>
      <a href="/">
        <img src={Logo} alt="Logo UTFSM" style={logoStyle} />
      </a>
      <div style={containerStyle} className="container">
        <h1>Recuperación de Contraseña</h1>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <label>
              Correo Electrónico:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputAndButtonStyle} />
            </label>
            <button type="submit" style={inputAndButtonStyle}>Enviar Solicitud de Recuperación</button>
          </form>
        </div>
        <span onClick={() => history.push('/login')} style={{ color: 'blue', cursor: 'pointer' }}>Volver al Inicio de Sesión</span>
      </div>
    </div>
  );
}

export default PasswordRecovery;
