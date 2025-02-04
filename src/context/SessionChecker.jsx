// SessionChecker.jsx
import React, { useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import axios from 'axios';
import { DigiContext } from './DigiContext';
import { checkStateSession } from '../../services/services';

const SessionChecker = () => {
  const location = useLocation();
  const history = useHistory();
  const { isAuthenticated, setIsAuthenticated } = useContext(DigiContext);

  useEffect(() => {
    const checkSession = async () => {
      const token = sessionStorage.getItem('token');

      if (token) {
        try {
          const response = checkStateSession(token);

          if (!response.data.isValid) {
            setIsAuthenticated(false);
            history.push('http://localhost:5173/'); // Redirige al inicio de sesión
          }
        } catch (error) {
          console.error('Error verifying token:', error);
          setIsAuthenticated(false);
          history.push('http://localhost:5173/'); // Redirige al inicio de sesión
        }
      } else {
        setIsAuthenticated(false);
        history.push('http://localhost:5173/'); // Redirige al inicio de sesión
      }
    };

    checkSession();
  }, [location, history, setIsAuthenticated]);

  return null;
};

export default SessionChecker;