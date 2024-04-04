import React, { useState } from 'react';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedMovie, setSelectedMovie] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [submittedMovie, setSubmittedMovie] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [totalPrice, setTotalPrice] = useState(0);

  // Fungsi untuk login
  const handleLogin = () => {
    const user = registeredUsers.find(user => user.username === username && user.password === password);
    if (user) {
      setLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  // Fungsi untuk register
  const handleRegister = () => {
    setRegisteredUsers(prevUsers => [...prevUsers, { username, password }]);
    setRegistered(true);
    alert('Registration successful');
  };

  // Event handler untuk pemilihan film
  const handleMovieSelection = (event) => {
    const selectedMovie = event.target.value;
    setSelectedMovie(selectedMovie);
    console.log('Selected movie:', selectedMovie);
  };

  // Fungsi untuk mengaktifkan laser
  const activateLasers = () => {
    console.log('Lasers activated!');
  };

  // Event handler untuk saat formulir disubmit
  const handleSubmit = (event) => {
    console.log('You clicked submit with selected movie:', selectedMovie);
    event.preventDefault();
    setSubmittedMovie(selectedMovie);
    setSubmitSuccess(true);
  };

  // Fungsi untuk menghapus baris
  const deleteRow = () => {
    console.log('Deleting selected movie:', selectedMovie);
    setSelectedMovie('');
    setSelectedSeats([]);
  };

  // Event handler untuk memilih kursi
  const handleSeatSelection = (seat) => {
    const updatedSeats = [...selectedSeats, seat];
    setSelectedSeats(updatedSeats);
    console.log('Selected seats:', updatedSeats);
  };

  // Event handler untuk mengubah jumlah tiket
  const handleTicketQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    setTicketQuantity(quantity);
  };

  // Fungsi untuk menghitung total harga berdasarkan jumlah tiket dan harga per tiket
  const calculateTotalPrice = () => {
    // Misalnya harga tiket per film adalah $10
    const ticketPrice = 10;
    const totalPrice = ticketPrice * ticketQuantity;
    setTotalPrice(totalPrice);
  };

  // Event handler untuk memilih metode pembayaran
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Event handler untuk menangani pembayaran
  const handlePayment = () => {
    // Lakukan logika pembayaran di sini
    alert(`Payment of $${totalPrice} via ${paymentMethod} is successful!`);
  };

  // Render form registrasi atau login tergantung pada status registrasi dan login
  return (
    <div>
      {!loggedIn && !registered ? (
        <div>
          <h1>Register</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <p>Already have an account? <button onClick={() => setRegistered(true)}>Login</button></p>
        </div>
      ) : !loggedIn ? (
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Movie Ticket Booking</h1>
          {submitSuccess ? (
            <div>
              <h2>Seat Selection</h2>
              <p>Select your seat for {selectedMovie}</p>
              <button onClick={activateLasers}>Activate Lasers</button>
              <h2>Payment</h2>
              <label htmlFor="paymentMethod">Select payment method:</label>
              <select id="paymentMethod" onChange={handlePaymentMethodChange} value={paymentMethod}>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
              <p>Total Price: ${totalPrice}</p>
              <button onClick={handlePayment}>Pay Now</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="movieSelection">Select a movie:</label>
              <select id="movieSelection" onChange={handleMovieSelection} value={selectedMovie}>
                <option value="">-- Please select a movie --</option>
                <option value="Avengers: Endgame">Avengers: Endgame</option>
                <option value="Spider-Man: Far From Home">Spider-Man: Far From Home</option>
                <option value="The Lion King">The Lion King</option>
                <option value="Inception">Inception</option>
                <option value="The Shawshank Redemption">The Shawshank Redemption</option>
              </select>
              <div>
                {selectedMovie && (
                  <div>
                    <img src={getMovieImage(selectedMovie)} alt={`${selectedMovie} Poster`} />
                    <p>{getMovieDescription(selectedMovie)}</p>
                  </div>
                )}
              </div>
              <label htmlFor="ticketQuantity">Select number of tickets:</label>
              <input type="number" id="ticketQuantity" value={ticketQuantity} onChange={handleTicketQuantityChange} min="1" />
              <button type="submit">Submit</button>
              <button onClick={deleteRow}>Delete Row</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

// Fungsi untuk mendapatkan URL gambar film berdasarkan judul film
function getMovieImage(movieTitle) {
  switch (movieTitle) {
    case 'Avengers: Endgame':
      return 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg';
    case 'Spider-Man: Far From Home':
      return 'https://upload.wikimedia.org/wikipedia/en/b/bd/Spider-Man_Far_From_Home_poster.jpg';
    case 'The Lion King':
      return 'https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg'; // Lion King poster URL
    case 'Inception':
      return 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg';
    case 'The Shawshank Redemption':
      return 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg';
    default:
      return ''; // URL default jika tidak ada gambar yang tersedia
  }
}

// Fungsi untuk mendapatkan deskripsi film berdasarkan judul film
function getMovieDescription(movieTitle) {
  switch (movieTitle) {
    case 'Avengers: Endgame $4':
      return 'After the devastating events of Avengers: Infinity War, the universe is in ruins.';
    case 'Spider-Man: Far From Home':
      return 'Following the events of Avengers: Endgame, Spider-Man must step up to take on new threats.';
    case 'The Lion King':
      return 'Simba, a young lion prince, flees his kingdom after the murder of his father, only to learn the true meaning of responsibility and bravery.';
    case 'Inception':
      return 'A thief who enters the dreams of others to steal secrets from their subconscious.';
    case 'The Shawshank Redemption':
      return 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.';
    default:
      return ''; // Deskripsi default jika tidak ada deskripsi yang tersedia
  }
}

export default App;
