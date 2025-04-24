import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { AuthContextProps } from './authContext.props';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const refreshToken = async () => {
    // verificamos que exista el accessToken en el localStorage
    const accessToken = localStorage.getItem('accessToken');
    console.log('accessToken', accessToken);
    
    if (accessToken) {
      setAccessToken(accessToken);
    }
    setUserName(localStorage.getItem('userName') || '');
    
  };

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
