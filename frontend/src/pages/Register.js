import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/auth/register', { email, password });
      history.push('/login');
    } catch (error) {
      console.error("Registro fallido", error);
    }
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Correo:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Registrarse</button>
    </form>
  </div>
);
}

export default Register;