import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido al Sistema de Reservas USM</h1>
      <nav>
        <Link to="/login">Iniciar sesión</Link>
        <Link to="/register">Registrarse</Link>
        <Link to="/reservations">Reservar</Link>
      </nav>
    </div>
  );
}

export default Home;