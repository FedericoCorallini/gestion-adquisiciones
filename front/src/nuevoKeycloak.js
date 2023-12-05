
import Keycloak from 'keycloak-js';

const initOptions = {
  url: 'http://localhost:8088/',
  realm: 'basic',
  clientId: 'react-app',
};

const keycloak = new Keycloak(initOptions);

export const initKeycloak = async () => {
  try {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: true,
      pkceMethod: 'S256',
    });

    if (!authenticated) {
      window.location.reload();
    } else {
      console.log('Access Token', keycloak.token);
      sessionStorage.setItem('jwt', keycloak.token);
      
    }
  } catch (error) {
    console.error('Authentication Failed:', error);
  }
};

export { keycloak };