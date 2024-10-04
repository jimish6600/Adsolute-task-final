import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const movies = [
  { id: 1, name: "Inception", price: 10, timing: "2024-10-05 14:00", availableSeats: 5 },
  { id: 2, name: "Interstellar", price: 15, timing: "2024-10-06 18:00", availableSeats: 2 },
  { id: 3, name: "The Dark Knight", price: 12, timing: "2024-10-05 16:00", availableSeats: 0 },
  { id: 4, name: "Parasite", price: 8, timing: "2024-10-07 19:00", availableSeats: 4 },
  { id: 5, name: "Joker", price: 9, timing: "2024-10-06 17:00", availableSeats: 3 },
];

const BookMovies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [date, setDate] = useState("");
  const [minTime, setMinTime] = useState(""); 
  const [desiredSeats, setDesiredSeats] = useState(""); // Input for desired number of seats
  const [filteredMovies, setFilteredMovies] = useState([]);

  const filterMovies = () => {
    return movies.filter((movie) => {
      const matchesName = movie.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice =
        minPrice === "" || movie.price >= parseFloat(minPrice);
      const matchesDate = date === "" || movie.timing.startsWith(date);

      const movieHour = movie.timing.split(" ")[1]; 
      const matchesTime = minTime === "" || movieHour > minTime;

      return matchesName && matchesPrice && matchesDate && matchesTime;
    });
  };

  useEffect(() => {
    const filtered = filterMovies();
    setFilteredMovies(filtered);
  }, [searchTerm, minPrice, date, minTime]); // Include minTime in dependencies

  const clearSearch = () => {
    setSearchTerm("");
    setMinPrice("");
    setDate("");
    setMinTime(""); // Clear minTime
    setDesiredSeats(""); // Clear desired seats
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Search Movies</h1>

      <div className="w-full max-w-lg flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          className="flex-1 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search by movie name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="number"
          className="flex-1 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Minimum price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="date"
          className="flex-1 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time" 
          className="flex-1 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={minTime}
          onChange={(e) => setMinTime(e.target.value)}
        />

        <input
          type="number"
          className="flex-1 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Desired seats"
          value={desiredSeats}
          onChange={(e) => setDesiredSeats(e.target.value)}
        />

        <button
          onClick={clearSearch}
          className="flex-shrink-0 p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
        >
          Clear
        </button>
      </div>

      <div className="text-lg mb-4">{filteredMovies.length} movie(s) found</div>

      <div className="mt-6 w-full max-w-lg">
        {filteredMovies.length > 0 ? (
          <ul className="bg-white shadow-lg rounded-lg overflow-hidden">
            {filteredMovies.map((movie) => {
              const isAvailable = movie.availableSeats >= (desiredSeats ? parseInt(desiredSeats) : 0);
              return (
                <li
                  key={movie.id}
                  className={`p-4 border-b border-gray-200 hover:bg-gray-100 transition ${isAvailable ? '' : 'text-gray-400'}`}
                >
                  <Link to={`/movie/${movie.id}`}>
                    {movie.name} - ${movie.price} - {movie.timing} - 
                    {isAvailable 
                      ? `${movie.availableSeats} seat(s) available` 
                      : 'No seats available'}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : searchTerm || minPrice || date || minTime || desiredSeats ? (
          <p className="text-gray-500 mt-4">No movies found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default BookMovies;
