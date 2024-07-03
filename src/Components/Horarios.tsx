import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Horarios = ({ movieId, date }) => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sessions', {
          params: { movieId, date }
        });
        console.log("Horários data:", response.data); // Log para verificar os dados recebidos
        setHorarios(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os horários:', error);
        setLoading(false);
      }
    };

    if (movieId && date) {
      fetchHorarios();
    }
  }, [movieId, date]);

  if (loading) {
    return <p>Carregando horários...</p>;
  }

  if (!horarios || horarios.length === 0) {
    return <p>Nenhum horário disponível.</p>;
  }

  return (
    <div>
      <h2>Horários Disponíveis</h2>
      {horarios.map(theater => (
        <div key={theater.id}>
          <h3>{theater.name}</h3>
          {theater.sessionTypes && theater.sessionTypes.map(sessionType => (
            <div key={sessionType.type}>
              {sessionType.sessions && sessionType.sessions.map(session => (
                <div key={session.id}>
                  <p>Sala: {session.room} - Tipo: {session.types.map(t => t.name).join(', ')}</p>
                  <p>Horário: {session.date.hour}</p>
                  <a href={session.siteURL}>Comprar Ingresso</a>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Horarios;
