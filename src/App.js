import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Registration from './components/Registration';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth onAuth={() => setIsAuthenticated(true)} />} />
          <Route path="/registration" element={<PrivateRoute element={<Registration />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
