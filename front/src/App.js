import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import { initKeycloak } from './keycloak';


function App() {
 
  useEffect(() => {
    // Inicializar Keycloak al montar el componente
    initKeycloak();
  }, []);

  return (
    <>
      <Dashboard></Dashboard>
    
    </>
  )
}

export default App;
