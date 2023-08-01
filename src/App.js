import React, { useState } from 'react';
import './App.css';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flightPrices, setFlightPrices] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!origin || !destination) {
    //   alert('Please provide both origin and destination.');
    //   return;
    // }
    const startDate = '2023-08-15';
    const endDate = '2023-08-20';

    try {
      const response = await fetch(`http://localhost:5000/api/flights?origin=${origin}&destination=${destination}&startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();
      console.log("data : ", data);
      setFlightPrices(data);
    } catch (error) {
      console.error('Error fetching flight prices:', error);
      alert('Failed to fetch flight prices.');
    }
  };

  return (
    <div className="App">
      <h1>Flight Prices between two cities</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="origin">Origin:</label>
        <input type="text" id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
        <label htmlFor="destination">Destination:</label>
        <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        <button type="submit">Get Flight Prices</button>
      </form>

      <div className="flightPriceResults">
        {flightPrices.length === 0 ? (
          <p>No flight prices found.</p>
        ) : (
          flightPrices.map((flight, index) => (
            <p key={index}>Airline: {flight.companyName}, Price: {flight.price}</p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
