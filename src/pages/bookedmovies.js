// BookedMovies.js
import React from "react";
import { Link } from "react-router-dom";

// Sample booked movies data with seat information
const bookedMoviesData = {
  1: { name: "Inception", price: 10, timing: "2024-10-05 14:00", seats: ["A1", "A2"] },
  2: { name: "Interstellar", price: 15, timing: "2024-10-06 18:00", seats: ["B1", "B2", "B3"] },
  3: { name: "The Dark Knight", price: 12, timing: "2024-10-05 16:00", seats: [] },
};

const BookedMovies = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Booked Movies</h1>
      {Object.keys(bookedMoviesData).length > 0 ? (
        <ul className="bg-white shadow-lg rounded-lg overflow-hidden">
          {Object.entries(bookedMoviesData).map(([id, movie]) => (
            <li key={id} className="p-4 border-b border-gray-200 hover:bg-gray-100 transition">
              <Link to={`/movie/${id}`} className="font-bold text-blue-500">
                {movie.name} - Price: ${movie.price} - Timing: {movie.timing}
              </Link>
              <div className="text-gray-500">
                {movie.seats.length > 0
                  ? `Booked Seats: ${movie.seats.join(", ")}`
                  : "No seats booked"}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No booked movies found.</p>
      )}
    </div>
  );
};

export default BookedMovies;
