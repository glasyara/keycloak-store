import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080', 
  realm: 'fakestore',           
  clientId: 'fakestore-frontend',
});

export default keycloak;
