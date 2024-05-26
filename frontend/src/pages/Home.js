import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const containerStyle = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: 'transparent',
    fontFamily: 'Arial, sans-serif'
  };

  const navStyle = {
    padding: '2rem'
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '0.75rem 1.5rem',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '0.5rem',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease' // Transición suave
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049' 
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ fontFamily: 'Rockwell, serif', fontSize: '40px' }}>Bienvenido a nuestro Sistema de Reservas USM!</h1>
      <img
        src={require('../styles/img/logo.JPG')}
        alt="Descripción del logotipo"
        style={{ width: '25%', height: '25%', borderRadius: '20%' }}
      />
      <h2 style={{ fontFamily: 'Rockwell, serif' }}>Ingresa a nuestro portal</h2>

      
      <main style={navStyle}>
        <nav>
          <Link
            to="/login"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            style={buttonStyle}
            onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Registrarse
          </Link>
        </nav>
      </main>
    </div>
  );
}

export default Home;
