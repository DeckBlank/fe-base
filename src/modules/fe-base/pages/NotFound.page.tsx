import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginPage } from '@/routes/appRoutes';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(loginPage.path);
  };

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex flex-1 items-center justify-center flex-col text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          404 - Página No Encontrada
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-600 text-white px-6 py-3 rounded-md flex items-center space-x-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-800"
        >
          Volver al Inicio
        </button>
      </main>
    </div>
  );
};

export default NotFoundPage;
