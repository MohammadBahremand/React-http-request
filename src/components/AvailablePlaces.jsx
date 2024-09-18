import Places from "./Places.jsx";
import { useState, useEffect } from "react";
import Error from "./Errors.jsx";
import { sortPlacesByDistance } from "../loc.js";
import fetchAvailablePlaces from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [AvailablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((postion) => {
          const storedPlaces = sortPlacesByDistance(
            places ,
            postion.coords.latitude,
            postion.coords.longitude 
          );
          setAvailablePlaces(storedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message ||
            "Could not fetch places data , please try again later",
        });
        setIsFetching(true);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error accurred!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={AvailablePlaces}
      isloading={isFetching}
      loadingText="Fetching place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
