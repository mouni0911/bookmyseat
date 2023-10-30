import React, { useState } from "react";
import "./MovieBookingsystem.css";

const MovieBookingsystem = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatType, setSelectedSeatType] = useState("standard");
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [seatAvailability, setSeatAvailability] = useState({
    standard: {
      rows: [...Array(20).keys()], // Define 20 seats in each row
    },
    premium: {
      rows: [...Array(20).keys()],
    },
  });
  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else if (selectedSeats.length < numberOfSeats && isSeatAvailable(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };
  const isSeatAvailable = (seat) => {
    // Check if the seat is booked
    return (
      !selectedSeats.includes(seat) &&
      ((selectedSeatType === "standard" &&
        !["A", "B"].includes(seat.charAt(0))) ||
        (selectedSeatType === "premium" && ["A", "B"].includes(seat.charAt(0))))
    );
  };

  return (
    <div className="movie-booking-continer">
      <h2>Book My Seat</h2>
      <div className="user-inputs">
        <select
          value={selectedSeatType}
          onChange={(e) => setSelectedSeatType(e.target.value, 10)}
        >
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
        <select
          className="qty"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(parseInt(e.target.value, 10))}
        >
          {[...Array(10).keys()].map((num) => (
            <option key={num} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Select Seats:</h2>
        <div className="seat-grid">
          {seatAvailability[selectedSeatType].rows.map((row) => (
            <div key={row} className="seat-row">
              {[...Array(10).keys()].map((seat) => {
                const seatId = String.fromCharCode(65 + seat) + (row + 1);
                return (
                  <div
                    key={seatId}
                    className={`seat ${
                      selectedSeats.includes(seatId) ? "selected" : ""
                    } ${!isSeatAvailable(seatId) ? "unavailable" : ""}`}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatId}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieBookingsystem;
