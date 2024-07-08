import { useState, useEffect } from "react";
import "react-spring-bottom-sheet/dist/style.css";
import axios from "axios";
import { motion } from "framer-motion";

interface Theater {
  id: string;
  name: string;
  address: string;
  geolocation: {
    lat: number;
    lng: number;
  };
}

function BottomSheetTab() {
  const [open, setOpen] = useState(false);
  const positionLat = -3.71722;
  const positionLng = -38.54339;
  const [theaters, setTheaters] = useState<Theater[]>([]);

  useEffect(() => {
    console.log("Theaters received in BottomSheetTab:", theaters);
    const fetchTheaters = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/theaters");
        setTheaters(response.data.items);
      } catch (error) {
        console.error("Erro ao buscar os cinemas:", error);
      }
    };

    fetchTheaters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("Theaters data:", theaters);

  const haversineDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): string => {
    const radius = 6371;
    const lat1Rad = lat1 * (Math.PI / 180);
    const lng1Rad = lng1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);
    const lng2Rad = lng2 * (Math.PI / 180);
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLng = lng2Rad - lng1Rad;
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance.toFixed(2);
  };

  return (
    <motion.div
      animate={!open ? { y: 500 } : { y: 200 }}
      className="absolute bg-gray-900 w-9/12 rounded-3xl pb-20"
    >
      <div
        className="flex justify-center w-full"
        onClick={() => setOpen(!open)}
      >
        <div className="bg-gray-500 h-2 w-16 mt-5 mb-5 rounded-md" />
      </div>
      <div className="p-4 max-h-96 overflow-y-auto">
        {theaters && theaters.length > 0 ? (
          theaters.map((theater) => (
            <div key={theater.id} className="p-1 mb-2 flex justify-between">
              <div>
                <h2 className="font-bold text-lg">{theater.name}</h2>
                <span>{theater.address}</span>
              </div>
              <span className=" ml-5">
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
    </motion.div>
  );
  // eslint-disable-next-line no-extra-semi
}

export default BottomSheetTab;
