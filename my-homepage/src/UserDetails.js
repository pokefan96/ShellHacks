// src/components/UserDetails.js
import React, { useState } from 'react';
import { auth, db } from './firebase'; // Import auth and Firestore database
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions

const UserDetails = () => {
  const [creditScore, setCreditScore] = useState('');
  const [yearlyIncome, setYearlyIncome] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Make sure to use the imported `auth`

    if (user) {
      // Create a reference to the user's document in Firestore
      const userDocRef = doc(db, 'users', user.uid);

      try {
        // Log the data before sending it to Firestore
        console.log("Saving data: ", { creditScore, yearlyIncome });

        // Store the user's credit score and yearly income in Firestore
        await setDoc(userDocRef, {
          creditScore: parseInt(creditScore),
          yearlyIncome: parseFloat(yearlyIncome)
        }, { merge: true }); // merge: true ensures it only updates fields and doesn't overwrite the document

        setMessage('Data saved successfully!');
        console.log("Data saved successfully!");
      } catch (error) {
        setMessage(`Error saving data: ${error.message}`);
        console.error("Error saving data: ", error);
      }
    } else {
      setMessage('No user is signed in.');
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
    </div>
  );
};

export default UserDetails;
