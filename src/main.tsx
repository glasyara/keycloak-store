import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import keycloak from './contexts/Keycloak'; // assuming you defined it here

keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  if (!authenticated) {
    console.warn('User not authenticated - reloading...');
    window.location.reload();
  } else {
    console.log('Authenticated');

    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <CartProvider>
          <App />
        </CartProvider>
      </React.StrictMode>
    );
  }
}).catch((err) => {
  console.error('Keycloak init failed:', err);
});
