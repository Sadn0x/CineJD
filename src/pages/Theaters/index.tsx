import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Theaters = () => {
  const positionLat = -3.71722;
  const positionLng = -38.54339;
  const position = [-3.71722, -38.54339];

  const [theaters, setTheaters] = useState([]); // Inicializar como array vazio

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/theaters");
        setTheaters(response.data.items);
      } catch (error) {
        console.error("Erro ao buscar os filmes:", error);
      }
    };

    fetchTheaters();
  }, []);

  console.log(theaters);

  const haversineDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const radius = 6371;

    // Converte graus para radianos
    const lat1Rad = lat1 * (Math.PI / 180);
    const lng1Rad = lng1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);
    const lng2Rad = lng2 * (Math.PI / 180);

    // Calcula diferenças de latitude e longitude em radianos
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLng = lng2Rad - lng1Rad;

    // Aplica a fórmula haversine
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distância em metros
    const distance = radius * c;

    return distance.toFixed(2);
  };

  return (
    <div className="flex justify-center items-center h-screen mt-1">
      <div className="w-9/12 min-w-80 h-screen">
        <h1 className="text-3xl font-bold mb-10 ml-10 mt-10">Theaters</h1>

        <div className="w-full h-full absolute right-0 z-0">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {theaters.length > 0 ? (
              theaters.map((theater) => (
                <Marker
                  key={theater.id}
                  position={[theater.geolocation.lat, theater.geolocation.lng]}
                >
                  <Popup>{theater.name}</Popup>
                </Marker>
              ))
            ) : (
              <Marker position={[51.505, -0.09]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>
      <div className="absolute bg-black">
        {theaters.length > 0 ? (
          theaters.map((theater) => (
            <div
              key={theater.id}
              className="bg-gray-800 p-1 mb-2 flex justify-between"
            >
              <div>
                <h2>
                  {theater.name} <br />
                </h2>
                <span> {theater.address}</span>
              </div>
              <span className="ml-5">
                {haversineDistance(
                  theater.geolocation.lat,
                  theater.geolocation.lng,
                  positionLat,
                  positionLng
                )}{" "}
                Km
              </span>
            </div>
          ))
        ) : (
          <span>Não foi possível encontrar os cinemas</span>
        )}
      </div>
    </div>
  );
};

export default Theaters;
