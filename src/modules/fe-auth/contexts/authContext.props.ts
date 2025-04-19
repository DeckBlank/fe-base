export interface AuthContextProps {
    accessToken: string;
    refreshToken: () => Promise<void>;
    userName: string;
  }