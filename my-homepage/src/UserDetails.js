import React, { useState } from 'react';

const UserDetails = () => {
  const [creditScore, setCreditScore] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [topCreditCards, setTopCreditCards] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to Flask backend
    const data = {
      creditScore: creditScore,
      yearlyIncome: yearlyIncome
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/filter_cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.length === 0) {
          setMessage('No credit cards fit your criteria.');
        } else {
          setTopCreditCards(result);
          setMessage('Here are the top credit cards for you:');
        }
      } else {
        setMessage('Error fetching credit cards.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to server.');
    }
};


  return (
    <div>
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Credit Score:</label>
          <input
            type="number"
            value={creditScore}
            onChange={(e) => setCreditScore(e.target.value)}
            placeholder="Enter your credit score"
            required
          />
        </div>
        <div>
          <label>Yearly Income:</label>
          <input
            type="number"
            value={yearlyIncome}
            onChange={(e) => setYearlyIncome(e.target.value)}
            placeholder="Enter your yearly income"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}

      {topCreditCards.length > 0 && (
        <ul>
          {topCreditCards.map((card, index) => (
            <li key={index}>
              {card['Credit Card']} - FICO Score: {card['Required FICO Score']} - Income Requirement: ${card['Estimated Minimum Income']}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDetails;
