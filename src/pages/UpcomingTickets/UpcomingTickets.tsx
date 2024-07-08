import rt_icon from "./assets/rt_icon.jpg";
import qrcode from "./assets/qrcode.jpg";
import { useEffect, useState } from "react";
import axios from "axios";


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

export function UpcomingTickets() {

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
        <div className="bg-coverimage w-full bg-no-repeat bg-bottom">
            <div className="bg-[linear-gradient(to_bottom,rgba(21,21,21,1),rgba(21,21,21,0.9),rgba(21,21,21,0.4))]">
          <div className="flex justify-center items-center h-screen mt-10">
            <div className="w-9/12 min-w-80 h-screen">
              <h1 className="text-3xl font-bold mb-10 ml-10 mt-10">Upcoming Tickets</h1>
              <h2 className="font-bold ml-10">Parasite</h2>
              <div className="flex mt-4 justify-between">
              <h2 className="ml-10">2h 12min</h2><span className="inline-flex items-baseline mr-10"><img src={rt_icon} height={16} width={16} className="mr-2"/>99%</span>
              </div>
                <h1 className="font-bold mb-10 ml-10 mt-10">Order confirmation</h1>
                <h2 className="font-bold mb-5 ml-10 mt-10">Order Details</h2>
                <div className="flex mt-2 justify-between">
                    <h2 className="ml-10">Adult Ticket (Seat D14)</h2>
                    <span className="mr-10">$16.49</span>
                </div>
                <div className="flex mt-2 justify-between">
                    <h2 className="ml-10">Adult Ticket (Seat D15)</h2>
                    <span className="mr-10">$16.49</span>
                </div>
                <div className="flex mt-2 justify-between text-gray-500">
                <h2 className="ml-10">Subtotal</h2>
                <span className="mr-10">$32.98</span>
                </div>
                <div className="flex mt-2 justify-between text-gray-500">
                <h2 className="ml-10">Tax</h2>
                <span className="mr-10">$2.47</span>
                </div>
                <div className="flex mt-2 justify-between">
                <h2 className="font-bold ml-10">Total</h2>
                <span className="mr-10">$35.45</span>
                </div>

                <div className="flex justify-center items-center mt-20"><img src={qrcode} /></div>
                </div>
              <div className="h-20" />
            </div>
          </div>
          
        </div>
      );
}