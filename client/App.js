import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';

const App = () => {
  useEffect(() => {
    const cart = window.localStorage.getItem('cart');
    if (!cart) {
      window.localStorage.setItem('cart', '{}');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes/>
      <img src="/grand-shoppe-logo.png" id="footer" />
    </div>
  );
};

export default App;
