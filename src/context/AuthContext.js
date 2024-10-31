import { createContext, useContext, useState } from 'react';
import { getStoredToken, setStoredToken, removeStoredToken } from '../services/storage';
import { getToken } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());

  const login = async (apiKey, apiSecret) => {
    try {
      const newToken = await getToken(apiKey, apiSecret);
      setToken(newToken);
      setStoredToken(newToken);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    removeStoredToken();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);