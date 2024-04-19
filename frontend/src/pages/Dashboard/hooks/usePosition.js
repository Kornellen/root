import { useEffect, useState } from "react";

const usePosition = () => {
  const [position, setPosition] = useState({
    latitude: "",
    longitude: "",
    error: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (positon) =>
          await setPosition({
            latitude: positon.coords.latitude,
            longitude: positon.coords.longitude,
          }),
        () => setPosition({ err: "Geolocal error" })
      );
    } else {
      setPosition({ err: "Geolocal is not allowed by this browser" });
    }
  }, []);

  return position;
};

export default usePosition;
