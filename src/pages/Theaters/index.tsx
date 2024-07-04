import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Theaters = () => {
    const position = [-3.71722, -38.54339]; 

    const [theaters, setTheaters] = useState([]); // Inicializar como array vazio

    useEffect(() => {
        const fetchTheaters = async () => {
          try {
            const response = await axios.get('http://localhost:5000/api/theaters');
            setTheaters(response.data.items);
          } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
          }
        };
    
        fetchTheaters();
      }, []);

      console.log(theaters);

    return (
        <div className="flex justify-center items-center h-screen mt-10">
            <div className="w-9/12 min-w-80 h-screen">
                <h1 className="text-3xl font-bold mb-10 ml-10 mt-10">Theaters</h1>

                <div className='w-full h-full absolute right-0 z-0'>
                    <MapContainer center={position} zoom={13}  style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {
                          theaters.length > 0 ? theaters.map((theater) => (

                              <Marker key={theater.id} position={[theater.geolocation.lat, theater.geolocation.lng]}>
                                <Popup>
                                    {theater.name}
                                </Popup>
                              </Marker>
                          )) : 
                          <Marker position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                        }
                        
                    </MapContainer>
                </div>
                
            </div>
        </div>
    );
};

export default Theaters;
