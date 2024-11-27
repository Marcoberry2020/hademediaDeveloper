import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import ConnectWallet from './components/ConnectWallet';
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/connect/:walletName" element={<ConnectWallet />} />
      </Routes>
    </Router>
  );
};

export default App;
