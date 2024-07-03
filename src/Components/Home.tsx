import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


interface Movie {
  id: string;
  title: string;
  synopsis: string;
  images: { url: string }[];
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
        console.log(movies)
      } catch (error) {
        console.error('Erro ao buscar os filmes:', error);
        setError('Erro ao buscar os filmes');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const truncateSynopsis = (synopsis: string) => {
    return synopsis.length > 200 ? synopsis.substring(0, 200) + '...' : synopsis;
  };

  if (loading) {
    return <p className="text-center mt-5">Carregando filmes...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-4xl font-bold mb-5 text-white">Featured Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <Carousel
      className="rounded-xl text-start"
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      showArrows={false}
      showIndicators={false}
      autoPlay={true}
      interval={3000}
      swipeable={true}
      emulateTouch={true}
    >
      {movies.map(movie => (
        <div key={movie.id} className="rounded-lg p-4 text-start">
          {movie.inPreSale && (
            <div className="badge relative ml-auto top-6 w-28 text-center text-sm font-bold p-2">
              PRÉ-VENDA
            </div>
          )}
          <div className={movie.inPreSale ? 'marginTop-25' : ''}>
            <img
              src={movie.images[0]?.url}
              alt={movie.title}
              className="w-full object-cover rounded-2xl height-30rem"
            />
            <h2 className="text-xl font-semibold mt-4 text-start">{movie.title}</h2>
            <p className="text-white mt-2 text-start">{truncateSynopsis(movie.synopsis)}</p>
            <Link to={`/movies/${movie.id}`}>
              <button className="mt-4 bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-600 text-start">
                Selecionar Sessão
              </button>
            </Link>
          </div>
        </div>
      ))}
    </Carousel>
      </div>
    </div>
  );
};

export default Home;
