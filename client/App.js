import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  useEffect(() => {
    window.localStorage.setItem('cart', '{}');
  }, []);

  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
