import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Filme {
  id: string;
  title: string;
  synopsis: string;
  images: { url: string }[];
}

const Filmes: React.FC = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setFilmes(response.data);
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
      }
    };

    fetchFilmes();
  }, []);

  const handleMovieClick = (id: string) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <ul className='flex justify-around flex-wrap'>
        {filmes.map((filme) => (
          <li
            className='flex flex-col bg-slate-700 text-white w-80 justify-center items-center p-2'
            key={filme.id}
            onClick={() => handleMovieClick(filme.id)}
          >
            <img
              className='rounded-xl w-72 h-96'
              src={filme.images[0].url}
              alt={`Poster do Filme: ${filme.title}`}
              height={500}
            />
            <h2 className='text-xl font-bold'>{filme.title}</h2>
            <p>{filme.synopsis}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filmes;
