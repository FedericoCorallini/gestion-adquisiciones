import Keycloak from 'keycloak-js';
import keycloakConfig from './keycloakConfig';

const keycloak = new Keycloak(keycloakConfig);

const initKeycloak = async () => {
  try {
    await keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256'}).then((auth) =>{
        if (!auth){
            window.location.reload();
        }
        else{
            console.log('Keycloak initialized');
            console.log(keycloak.token);   
        }
    }
    );
  } catch (error) {
    console.error('Error initializing Keycloak:', error);
    
  }
};

export { keycloak, initKeycloak };
