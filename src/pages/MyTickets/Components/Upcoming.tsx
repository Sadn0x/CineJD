import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Movie {
  id: string;
  title: string;
  images: { url: string }[];
  premiereDate: {
    year: string;
    dayAndMonth: string;
    hour: string;
  };
  inPreSale: boolean;
}

function Upcoming() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMovies(response.data);
        console.log(movies);
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
        setError("Erro ao buscar os filmes");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Carregando filmes...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">{error}</p>;
  }

  return (
    <div style={{ borderColor: "#383838" }} className="pl-10 pr-10 pb-5">
      <h2 className="font-bold">Upcoming</h2>

      <div className="mt-6 flex">
        <img
          src={
            movie.title == "A Hora da Estrela" ||
            movie.title == "A Flor Do Buriti" ||
            movie.title == "Tudo O Que Você Podia Ser"
              ? movie.images[1]?.url
              : movie.images[0]?.url
          }
          alt="Upcoming Movie"
          width={155}
        />
        <div className="bg-gray-800 mt-5 mb-5 w-full p-6 flex flex-col">
          <h2 className="font-bold text-lg mb-2">{movie.title}</h2>
          <span className="text-gray-400 mb-1">
            {movie.premiereDate.dayAndMonth}/{movie.premiereDate.year}
          </span>
          <span className="text-gray-400 mb-1">{movie.premiereDate.hour}h</span>
          <div className="w-full text-right">
            <span className="text-right p-2 pl-4 pr-4 rounded-lg text-blue-500 hover:bg-blue-900 hover:text-white">
              <Link to={`/upcoming-tickets/${movie.id}`}>
                <button>View details</button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;
