import React, { useState } from 'react';
import { Button } from '@/ui/components/ui/button';
import { AuthService } from '@/modules/fe-auth/services/auth.service';
import { useNavigate } from 'react-router-dom';
const LoginPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const authService = new AuthService();
      const response = await authService.basicLogin({ email, password });
      console.log('Login exitoso2', response);
      authService.setAccessToken(response.data.token);
      window.location.reload();
    } catch (e: any) {
      console.error('Error al iniciar sesión', e);
      setError('Correo o contraseña incorrectos');
    }
  };

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

        <input
          type="email"
          placeholder="Correo electrónico"
          className="mb-2 px-4 py-2 rounded border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="mb-4 px-4 py-2 rounded border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <Button
          className="bg-blue-600 text-white px-6 py-3"
          onClick={handleLogin}
        >
          Iniciar sesión
        </Button>
        <hr className="border-t border-blue-700 w-[300px] mx-auto mt-4" />
      </main>
    </div>
  );
};

export default LoginPage;
