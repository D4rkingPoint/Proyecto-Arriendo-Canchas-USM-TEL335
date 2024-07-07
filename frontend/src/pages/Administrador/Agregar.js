import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom
import NavbarAdmin from '../../components/Navbar_admin';
import { useHistory } from 'react-router-dom';
import api from '../../api';

function Agregar() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [dias, setDias] = useState(7);
  const [bloques, setBloques] = useState(10);
  const [selectedBlocks, setSelectedBlocks] = useState([]);
  const [image, setImage] = useState(null);

  const history = useHistory();

  const handleBlockClick = (day, block) => {
    const blockIdentifier = `${day}-${block}`;
    setSelectedBlocks(prevSelectedBlocks =>
      prevSelectedBlocks.includes(blockIdentifier)
        ? prevSelectedBlocks.filter(b => b !== blockIdentifier)
        : [...prevSelectedBlocks, blockIdentifier]
    );
  };


  const handleAddCancha = async () => {
    try {
      var fotografia;
      if (image) {
        fotografia = image;
      } else {
        fotografia = "";
      }
      const canchaResponse = await api.post('/canchas', { nombre, tipo, ubicacion, fotografia }, {});
      const canchaId = canchaResponse.data.id;
  

      const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
      
      for (const block of selectedBlocks) {
        const [day, blockNumber] = block.split('-');
        await api.post('/horarios', {
          canchaId,
          dia: daysOfWeek[day - 1],
          bloque:blockNumber,
        });
      }

      // Redirigir al usuario a la gestión de canchas
      history.push('/admin/gestionCanchas');
    } catch (error) {
      console.error('Error adding cancha and schedules', error);
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <div style={styles.container}>
        <h1>Agregar Cancha</h1>
        <input type="file" accept="image/*" style={styles.fileInput} onChange={e => setImage(e.target.files[0])} />
        <input type="text" placeholder="Nombre de la Cancha" style={styles.input} value={nombre} onChange={e => setNombre(e.target.value)} />
        <input type="text" placeholder="Tipo de cancha" style={styles.input} value={tipo} onChange={e => setTipo(e.target.value)} />
        <textarea placeholder="Ubicacion de la cancha" style={styles.textArea} value={ubicacion} onChange={e => setUbicacion(e.target.value)}></textarea>
        <div style={styles.flexContainer}>
          <div style={styles.flexItem}>
            <label>Días:</label>
            <input
              type="number"
              min="1"
              max="7"
              value={dias}
              onChange={e => setDias(Number(e.target.value))}
              style={styles.input}
            />
          </div>
          <div style={styles.flexItem}>
            <label>Bloques:</label>
            <input
              type="number"
              min="1"
              max="10"
              value={bloques}
              onChange={e => setBloques(Number(e.target.value))}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Bloque</th>
                {[...Array(dias)].map((_, i) => (
                  <th key={i + 1}>{['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'][i]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(bloques)].map((_, blockIndex) => (
                <tr key={blockIndex + 1}>
                  <td>{blockIndex * 2 + 1}-{blockIndex * 2 + 2}</td>
                  {[...Array(dias)].map((_, dayIndex) => (
                    <td
                      key={dayIndex + 1}
                      style={{
                        backgroundColor: selectedBlocks.includes(`${dayIndex + 1}-${blockIndex + 1}`) ? 'lightgreen' : 'white',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleBlockClick(dayIndex + 1, blockIndex + 1)}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.buttonContainer}>
          <button style={styles.confirmButton} onClick={handleAddCancha}>Agregar</button>
          <Link to="/admin/gestionCanchas" style={styles.cancelButton}>Cancelar</Link>
        </div>
      </div>
    </div>
  );
}

// Estilos
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
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
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  flexItem: {
    flex: 1,
    marginRight: '10px',
  },
  tableContainer: {
    overflowX: 'auto',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
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
    textDecoration: 'none',
  },
};

export default Agregar;