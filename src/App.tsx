import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import MovieDetails from './Components/MovieDetails';
import Navigation from './Components/Navigation';
import { Account } from './pages/Account/Account';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path='/Account' element={<Account />} />
        </Routes>
        <Navigation/>
      </Router>
      
  );
};

export default App;
