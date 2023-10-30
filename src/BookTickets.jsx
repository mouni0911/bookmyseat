import React, { useState, useEffect } from "react";
import "./BookTickets.css";

const MovieBookingsystem = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatType, setSelectedSeatType] = useState("standard");
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [bookedSeats, setBookedSeats] = useState([]); // Maintain a list of booked seats
  const [overallSeats, setOverallSeats] = useState([]);
  const [remainingSeats, setRemainingSeats] = useState([]);
  useEffect(() => {
    const allSeats = [];
    for (let row = 1; row <= 20; row++) {
      for (let seat = 1; seat <= 10; seat++) {
        allSeats.push(String.fromCharCode(64 + seat) + row);
      }
    }
    setOverallSeats(allSeats);

    const remaining = allSeats.filter((seat) => !bookedSeats.includes(seat));
    setRemainingSeats(remaining);
  }, [selectedSeats, bookedSeats]);

  const seatPrices = {
    standard: 150,
    premium: 200,
  };

  const handleSeatClick = (seat) => {
    const updatedSelectedSeats = [...selectedSeats];

    if (updatedSelectedSeats.includes(seat)) {
      // The seat is already selected, deselect it
      updatedSelectedSeats.splice(updatedSelectedSeats.indexOf(seat), 1);
    } else {
      const seatLetter = seat.charAt(0);
      const seatNumber = Number(seat.substring(1));
      const maxSeatNumber = seatNumber + numberOfSeats - 1;
      // Clear the selection if the clicked seat is not in a consecutive group
      if (
        !isConsecutiveGroup(
          selectedSeats,
          seatLetter,
          seatNumber,
          numberOfSeats
        )
      ) {
        updatedSelectedSeats.length = 0;
      }

      if (maxSeatNumber <= 20) {
        // Add the clicked seat and the consecutive seats (up to the selected quantity)
        for (let i = 0; i < numberOfSeats; i++) {
          const newSeat = seatLetter + (seatNumber + i);
          if (!isSeatAvailable(newSeat)) {
            break;
          }
          updatedSelectedSeats.push(newSeat);
        }
      }
    }

    setSelectedSeats(updatedSelectedSeats);
  };
  // Helper function to check if the selected seats are in a consecutive group
  const isConsecutiveGroup = (selectedSeats, letter, startNumber, quantity) => {
    for (let i = 0; i < quantity; i++) {
      const newSeat = letter + (startNumber + i);
      if (!selectedSeats.includes(newSeat) || !isSeatAvailable(newSeat)) {
        return false;
      }
    }
    return true;
  };

  const isSeatAvailable = (seat) => {
    // Check if the seat is booked
    return (
      !selectedSeats.includes(seat) &&
      ((selectedSeatType === "standard" &&
        !["A", "B"].includes(seat.charAt(0))) ||
        (selectedSeatType === "premium" &&
          ["A", "B"].includes(seat.charAt(0)))) &&
      !bookedSeats.includes(seat)
    );
  };

  const totalPrice = selectedSeats.length * seatPrices[selectedSeatType];

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
    }
    if (selectedSeats.length !== numberOfSeats) {
      alert("Please select the correct number of seats");
    } else {
      // Add selected seats to bookedSeats
      setBookedSeats([...bookedSeats, ...selectedSeats]);

      setSelectedSeatType("standard");
      setNumberOfSeats(1);

      alert(
        `Proceeding with ${numberOfSeats} ${selectedSeatType} seat(s): ${selectedSeats.join(
          ", "
        )}. Total price: ${totalPrice} RS`
      );
      setSelectedSeats([]);
    }
  };

  return (
    <div className="movie-booking-container">
      <h2>Book My Seat</h2>
      <div className="user-inputs">
        <select
          placeholder="Ticket Type"
          value={selectedSeatType}
          onChange={(e) => setSelectedSeatType(e.target.value)}
        >
          <option value="standard">Standard-150Rs</option>
          <option value="premium">Premium-200RS</option>
        </select>
        <label
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          Qty
        </label>
        <select
          className="qty"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(parseInt(e.target.value, 10))}
        >
          {[...Array(6).keys()].map((num) => (
            <option key={num} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <div>
        <span style={{ color: "black", fontSize: "20px", marginRight: "20px" }}>
          Select Seats:
        </span>
        <>
          <input style={{ width: "10px", backgroundColor: "Green" }} />
          <label>Selection Type</label>
          <input
            style={{
              width: "10px",
              backgroundColor: "gray",
              marginLeft: "10px",
            }}
          />
          <label>Unavailable</label>
          <input
            style={{
              width: "10px",
              backgroundColor: "white",
              marginLeft: "10px",
            }}
          />
          <label>Available</label>
        </>
        <div className="info">
          <p>
            Overall Seats: <span>{overallSeats.length}</span>
          </p>
          <p>
            Booked Seats: <span>{bookedSeats.length}</span>
          </p>
          <p>
            Remaining Seats:<span>{remainingSeats.length}</span>{" "}
          </p>
        </div>

        <div className="seat-grid">
          {[...Array(20).keys()].map((row) => (
            <div key={row} className="seat-row">
              {[...Array(10).keys()].map((seat) => {
                const seatId = String.fromCharCode(65 + seat) + (row + 1);
                const isSelected = selectedSeats.includes(seatId);
                const isBooked = bookedSeats.includes(seatId);
                return (
                  <div
                    key={seatId}
                    className={`seat ${isSelected ? "selected" : ""} ${
                      isBooked ? "booked" : ""
                    }`}
                    onClick={() => handleSeatClick(seatId)}
                  >
                    {seatId}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p>Total Price: {totalPrice} RS</p>
        <button onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
};

export default MovieBookingsystem;
