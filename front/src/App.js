import React, {useEffect} from 'react';
import Dashboard from './Dashboard';
import { initKeycloak, keycloak } from './keycloak';
import { TokenProvider } from './hooks/TokenProvider';

function App() {
 
  useEffect(() => {
    // Inicializar Keycloak al montar el componente
    initKeycloak().then((response) => {
      localStorage.setItem('jwt', JSON.stringify(keycloak.token));
      console.log(localStorage.getItem('jwt'))
    });
  }, []);

  return (
    <TokenProvider>
      <Dashboard />
    </TokenProvider>
  )
}

export default App;
