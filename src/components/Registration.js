import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const Registration = () => {
  const [nationalId, setNationalId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      const voterId = generateVoterId();
      await addDoc(collection(db, 'voters'), {
        nationalId,
        firstName,
        lastName,
        email,
        voterId
      });

      // Send voter ID to email
      sendVoterIdEmail(email, voterId);
    } catch (error) {
      console.error('Error registering voter:', error);
    }
  };

  const generateVoterId = () => {
    return 'VOTER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const sendVoterIdEmail = async (email, voterId) => {
    try {
      const response = await fetch('https://your-cloud-function-url/sendVoterIdEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, voterId }),
      });

      if (response.ok) {
        alert('Voter ID sent to your email.');
      } else {
        alert('Error sending voter ID email.');
      }
    } catch (error) {
      console.error('Error sending voter ID email:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Voter Registration</h2>
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          placeholder="National ID"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full p-2 mb-4 text-white bg-blue-500 rounded"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Registration;
