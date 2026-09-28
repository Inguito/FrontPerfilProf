import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-md">
          Sistema Jurisdiccional de Docentes y Oferta Curricular
        </h1>
        <p className="text-xl text-gray-200 mb-8 font-light">
          Gestión integral de legajos, nomenclador de títulos y cobertura de espacios curriculares.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Ingresar al Sistema
        </button>
      </div>
    </div>
  );
};