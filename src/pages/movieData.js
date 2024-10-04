import React, { useState } from "react";
import { useParams } from "react-router-dom";

const movieData = {
  1: {
    name: "Inception",
    price: 10,
    timing: "2024-10-05 14:00",
    description: "A thief who steals corporate secrets...",
  },
  2: {
    name: "Interstellar",
    price: 15,
    timing: "2024-10-06 18:00",
    description: "A team of explorers travel through a wormhole...",
  },
  3: {
    name: "The Dark Knight",
    price: 12,
    timing: "2024-10-05 16:00",
    description: "Batman faces the Joker...",
  },
  4: {
    name: "Parasite",
    price: 8,
    timing: "2024-10-07 19:00",
    description:
      "A poor family schemes to become employed by a wealthy family...",
  },
  5: {
    name: "Joker",
    price: 9,
    timing: "2024-10-06 17:00",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck...",
  },
};

const bookedSeatsData = {
  1: ["A1", "A2"],
  2: ["B1", "B2", "B3"],
  3: [],
  4: ["C1", "C2"],
  5: ["D1"],
};

const rows = ["A", "B", "C", "D", "E"];
const columns = 5;

const MovieDetails = () => {
  const { id } = useParams();
  const movie = movieData[id];

  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  const bookedSeats = bookedSeatsData[id] || [];

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seat)
        ? prevSelected.filter((s) => s !== seat)
        : [...prevSelected, seat]
    );
  };

  const handleBooking = () => {
    alert(`Booked seats: ${selectedSeats.join(", ")}`);
    setSelectedSeats([]);
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{movie.name}</h1>
      <p>
        <strong>Price:</strong> ${movie.price}
      </p>
      <p>
        <strong>Timing:</strong> {movie.timing}
      </p>
      <p>
        <strong>Description:</strong> {movie.description}
      </p>

      <h2 className="text-2xl font-bold mt-8">Select Your Seats</h2>
      <div className="mt-4">
        {rows.map((row) => (
          <div key={row} className="flex justify-center mb-2">
            {Array.from({ length: columns }, (_, index) => {
              const seat = `${row}${index + 1}`; // Generate seat identifier
              const isBooked = bookedSeats.includes(seat); // Check if the seat is booked
              const isSelected = selectedSeats.includes(seat); // Check if the seat is selected

              return (
                <button
                  key={seat}
                  className={`w-10 h-10 mx-1 rounded ${
                    isBooked
                      ? "bg-red-500 cursor-not-allowed"
                      : isSelected
                      ? "bg-green-500"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => !isBooked && toggleSeatSelection(seat)}
                  disabled={isBooked}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={handleBooking}
          className="p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          disabled={selectedSeats.length === 0} // Disable button if no seats selected
        >
          Book Selected Seats
        </button>
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold">Selected Seats:</h3>
          <p>{selectedSeats.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
