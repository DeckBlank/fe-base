import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useMsal } from '@azure/msal-react';
import { handleLogout, loginRequest } from '@/modules/fe-auth/infrastructure/msalt/authConfig';
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
  const { instance, accounts } = useMsal();

  const refreshToken = async () => {
    if (accounts.length > 0) {
      try {
        const token = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });
        setAccessToken(token?.accessToken || '');
        setUserName(token?.account?.name || '');
      } catch (error) {
        console.error('Error al obtener el access token:', error);
        handleLogout(instance);
      }
    }
  };

  useEffect(() => {
    refreshToken();
  }, [accounts, instance]);

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, userName }}>
      {children}
    </AuthContext.Provider>
  );
};
