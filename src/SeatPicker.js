import React, { useState } from 'react';

function SeatPicker({ selectedMovie }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Fungsi untuk memilih kursi
  const handleSeatSelection = (seat) => {
    const updatedSeats = [...selectedSeats, seat];
    setSelectedSeats(updatedSeats);
    console.log('Selected seats:', updatedSeats);
  };

  // Logika untuk menampilkan peta kursi

  return (
    <div>
      <h2>Seat Selection</h2>
      <p>Select your seat for {selectedMovie}</p>
      {/* Tampilkan peta kursi di sini */}
    </div>
  );
}

export default SeatPicker;
