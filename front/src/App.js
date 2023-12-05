import React, {useEffect, useState} from 'react';
import Dashboard from './Dashboard';
import { initKeycloak, keycloak } from './nuevoKeycloak';

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
