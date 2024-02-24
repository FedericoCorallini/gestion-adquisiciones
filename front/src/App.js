import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import { initKeycloak } from './nuevoKeycloak';

function App() {

  useEffect(() => {
    const initializeKeycloak = async () => {
      await initKeycloak();
    };
    initializeKeycloak();
  }, []);

  return (
      <>
      <Dashboard />
      </>
  )
}

export default App;
