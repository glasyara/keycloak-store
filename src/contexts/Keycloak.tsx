// contexts/Keycloak.ts
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080', // no /auth if you're on Keycloak v22+
  realm: 'fakestore',           // ← your actual realm name
  clientId: 'fakestore-frontend',
});

export default keycloak;
