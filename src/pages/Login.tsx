import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'mor_2314',
            password: '83r5^_',
          }),
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/products');
        } else {
          console.error('Login failed:', data);
          alert('Falha no login automático');
        }
      } catch (err) {
        console.error('Erro ao logar automaticamente:', err);
        alert('Erro de rede no login automático');
      }
    };

    autoLogin();
  }, [navigate]);

  return null; // nothing to show, just auto-login
};

export default LoginPage;
