import React, { useState } from "react";
import "./Style.css";

function MovieBookingSystem() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [selectedSeatType, setSelectedSeatType] = useState("standard");
  const [numberOfSeats, setNumberOfSeats] = useState(1);

  // Define seatAvailability as a state variable
  const [seatAvailability, setSeatAvailability] = useState({
    standard: [
      ["A1", "A2", "A3", "A4", "A5"],
      ["B1", "B2", "B3", "B4", "B5"],
    ],
    premium: [
      ["P1", "P2", "P3", "P4", "P5"],
      ["P6", "P7", "P8", "P9", "P10"],
    ],
  });

  // State variables for selected seat details
  const [selectedSeatDetails, setSelectedSeatDetails] = useState([]);
  const [selectedSeatQuantity, setSelectedSeatQuantity] = useState(0);
  const [selectedSeatTypeLabel, setSelectedSeatTypeLabel] = useState("");

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else if (selectedSeats.length < numberOfSeats && isSeatAvailable(seat)) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleProceed = () => {
    // Mark selected seats as "Unavailable" and clear the selection
    const updatedAvailability = { ...seatAvailability };
    selectedSeats.forEach((seat) => {
      const [row, col] = seat.split("");
      const rowIdx = parseInt(row, 10);
      const colIdx = parseInt(col, 10);
      updatedAvailability[selectedSeatType][rowIdx][colIdx] = "Unavailable";
    });
    setSelectedSeats([]);
    setNumberOfSeats(1);
    setSeatAvailability(updatedAvailability); // Update the availability state with the new data

    // Update selected seat details
    setSelectedSeatDetails(selectedSeats);
    setSelectedSeatQuantity(selectedSeats.length);
    setSelectedSeatTypeLabel(selectedSeatType);
  };

  const isSeatAvailable = (seat) => {
    return seatAvailability[selectedSeatType].some((row) => row.includes(seat));
  };

  return (
    <div className="movie-booking-container">
      <h1>Movie Ticket Booking</h1>
      <div className="user-inputs">
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <select
          value={selectedSeatType}
          onChange={(e) => setSelectedSeatType(e.target.value)}
        >
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
        <input
          type="number"
          placeholder="Number of Seats"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(e.target.value)}
        />
      </div>
      <div>
        <h2>Select Seats:</h2>
        <div className="seat-grid">
          {seatAvailability[selectedSeatType].map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat) => (
                <div
                  key={seat}
                  className={`seat ${
                    selectedSeats.includes(seat) ? "selected" : ""
                  } ${!isSeatAvailable(seat) ? "unavailable" : ""}`}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleProceed}>Proceed</button>

      {/* Display selected seat details */}
      {selectedSeatDetails.length > 0 && (
        <div>
          <h2>Selected Seat Details:</h2>
          <p>Seat Type: {selectedSeatTypeLabel}</p>
          <p>Number of Seats: {selectedSeatQuantity}</p>
          <p>Selected Seats: {selectedSeatDetails.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default MovieBookingSystem;
