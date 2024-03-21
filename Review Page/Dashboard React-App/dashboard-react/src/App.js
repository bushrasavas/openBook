// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change 'Switch' to 'Routes'
import Dashboard from './components/Dashboard';
import AccountPage from './components/AccountPage';
import Home from './components/Home';
import BookReviews from './components/BookReviews';

function App() {
  return (
    <Router>
      <div>
        {/* Header or Navigation can be added here if needed */}

        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/reviews/:bookId" element={<BookReviews />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
