import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Auth = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Sign up successful. Please log in.');
        setIsSignUp(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onAuth();
        navigate('/registration');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage('Authentication error: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xs p-8 bg-white rounded shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 mb-4 text-white bg-blue-500 rounded"
          onClick={handleAuth}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
        <button
          className="w-full p-2 text-blue-500 border border-blue-500 rounded"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
