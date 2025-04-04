import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/EncuestaSatisfaccion.module.css';

const EncuestaSatisfaccion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [calificacion, setCalificacion] = useState(0);
  const [comentarios, setComentarios] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar la encuesta
    alert(`Encuesta enviada para el ticket ${id}`);
    navigate('/Tickets');
  };

  return (  
    <div className={styles.container}>
      <h1>Encuesta de Satisfacción - Ticket #{id}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Calificación del servicio (1-5):</label>
          <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.star} ${calificacion >= star ? styles.active : ''}`}
                onClick={() => setCalificacion(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label>Comentarios adicionales:</label>
          <textarea
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            className={styles.textarea}
          />
        </div>
        
        <button type="submit" className={styles.submitButton}>
          Enviar Encuesta
        </button>
      </form>
    </div>
  );
};

export default EncuestaSatisfaccion;