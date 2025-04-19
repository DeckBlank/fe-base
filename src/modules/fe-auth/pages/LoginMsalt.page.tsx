import React, { useEffect } from 'react';
import { Button } from '@/ui/components/ui/button';
import { loginRequest } from '@/modules/fe-auth/msalt/authConfig';
import { useMsal } from "@azure/msal-react";
import { AuthService } from '@/modules/fe-auth/services/auth.service';

const LoginPage: React.FunctionComponent = () => {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginPopup(loginRequest).then(auth=>{
      const authService = new AuthService(auth.accessToken);
      authService.login({
        userName: auth.account.name as string,
        email: auth.account.username as string
      });
    }).catch(e => {
      console.log(e);
  });
}
  return (
    <div className="backgroundImage flex flex-col min-h-screen">
      <main className="flex flex-1 items-center justify-center flex-col text-center px-4">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-white text-5xl font-bold">Aplicación Base</h1>
          <hr className="border-t border-blue-700 w-[300px] mx-auto mb-4" />
          <label className="text-lg text-black font-bold">
            Inicio de Sesión
          </label>
        </div>
        <Button
          className="bg-blue-600 text-white px-6 py-3 flex items-center space-x-2"
          onClick={handleLogin}
        >
          <img
            src="/entraID.svg"
            alt="Microsoft Entra ID"
            className="w-6 h-6"
          />
          <span>Microsoft Entry ID</span>
        </Button>
        <hr className="border-t border-blue-700 w-[300px] mx-auto mt-4" />
      </main>
    </div>
  );
};

export default LoginPage;
