import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import YouTubePlayer from './YoutubePlayer';

interface Trailer {
  type: string;
  url: string;
}

interface MovieDetails {
  id: string;
  title: string;
  synopsis: string;
  images: { url: string }[];
  trailers: Trailer[];
}

interface Theater {
  id: string;
  name: string;
  geolocation: { lat: number; lng: number };
  sessionTypes: SessionType[];
}

interface SessionType {
  type: string;
  sessions: Session[];
}

interface Session {
  id: string;
  room: string;
  date: { hour: string };
  types: { name: string }[];
  siteURL: string;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTheater, setSelectedTheater] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
        setError('Erro ao buscar os detalhes do filme');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sessions', {
          params: { movieId: id, date }
        });
        if (response.data && response.data.length > 0 && response.data[0].theaters) {
          setTheaters(response.data[0].theaters);
        } else {
          setTheaters([]);
        }
      } catch (error) {
        console.error('Erro ao buscar os horários:', error);
        setError('Erro ao buscar os horários');
      }
    };

    if (id && date) {
      fetchSessions();
    }
  }, [id, date]);

  const handleDateChange = (dateString: string) => {
    setDate(dateString);
  };

  const handleTheaterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTheater(event.target.value);
  };

  const getDateArray = () => {
    const dates = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (loading) {
    return <p className="text-center mt-5">Carregando detalhes do filme...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">{error}</p>;
  }

  const selectedTheaterObj = theaters.find(theater => theater.id === selectedTheater);

  return (
    <div className="container mx-auto p-5">
      {movie ? (
        <div>
          <img src={movie.images[1]?.url || movie.images[0]?.url} alt={movie.title} className="w-full h-96 object-cover rounded-md" />
          <h1 className="text-3xl font-bold mt-4">{movie.title}</h1>
          <p className="text-gray-700 mt-2">{movie.synopsis}</p>
          <h2 className="text-2xl font-semibold mt-6">Trailers</h2>
          {movie.trailers && movie.trailers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {movie.trailers.map(trailer => {
                const videoId = new URL(trailer.url).searchParams.get("v");
                return videoId ? <YouTubePlayer key={videoId} videoId={videoId} /> : null;
              })}
            </div>
          ) : (
            <p className="mt-4">Nenhum trailer disponível.</p>
          )}
          <label className="block mt-6">
            <span className="text-lg font-medium">Selecione a data:</span>
            <div className="flex overflow-x-scroll mt-2 space-x-2 hidden-scroll-x">
              {getDateArray().map(dateString => (
                <button
                  key={dateString}
                  onClick={() => handleDateChange(dateString)}
                  className={`px-4 py-2 rounded ${date === dateString ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-900'}`}
                >
                  {new Date(dateString).toLocaleDateString('pt-BR')}
                </button>
              ))}
            </div>
          </label>
          <label className="block mt-6">
            <span className="text-lg font-medium">Selecione o cinema:</span>
            <select
              onChange={handleTheaterChange}
              value={selectedTheater || ''}
              className="block w-full mt-2 p-2 border rounded"
            >
              <option value="" disabled>Selecione um cinema</option>
              {theaters.map(theater => (
                <option key={theater.id} value={theater.id}>{theater.name}</option>
              ))}
            </select>
          </label>
         
          {selectedTheaterObj && selectedTheaterObj.sessionTypes && selectedTheaterObj.sessionTypes.length > 0 ? (
            selectedTheaterObj.sessionTypes.map(sessionType => (
              <div key={sessionType.type.join(', ')} className="mt-6">
                <h3 className="text-xl font-semibold">{sessionType.type.join(', ')}</h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {sessionType.sessions.map(session => (
                    <div key={session.id} className="border p-4 rounded">
                      <p>Sala: {session.room}</p>
                      <p>Tipo: {session.types.map(t => t.name).join(', ')}</p>
                      <p>Horário: {session.date.hour}</p>
                      <a href={session.siteURL} className="text-blue-500 hover:underline" target='_blank'>Comprar Ingresso</a>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="mt-6">Por gentileza, verificar horário e cinema selecionado.</p>
          )}
        </div>
      ) : (
        <p className="text-center mt-5">Nenhum detalhe disponível para este filme.</p>
      )}
    </div>
  );
};

export default MovieDetails;
