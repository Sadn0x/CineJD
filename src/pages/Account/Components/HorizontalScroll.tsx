import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Movie {
  id: string;
  title: string;
  synopsis: string;
  images: { url: string }[];
  inPreSale: string;
}

const HorizontalScroll: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="horizontal-scroll w-full overflow-x-auto whitespace-nowrap">
      {movies.map((movie) =>
        !movie.inPreSale &&
        movie.title !== "A Hora da Estrela" &&
        movie.title !== "Tudo O Que Você Podia Ser" &&
        movie.title !== "A Flor Do Buriti" ? (
          <div key={movie.id} className="scroll-content inline-block mb-5">
            <Link to={`/movies/${movie.id}`}>
              <img
                src={movie.images[0]?.url}
                alt={movie.title}
                className="w-48 object-cover rounded-xl mr-4"
              />
            </Link>
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default HorizontalScroll;
