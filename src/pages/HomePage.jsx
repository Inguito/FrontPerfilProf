import React, { useEffect, useState } from 'react';
import { getProfesores, createProfesor } from '../services/api';
import { ProfesorCard } from '../components/ProfesorCard';
import { ProfesorModal } from '../components/ProfesorModal';

export const HomePage = () => {
  const [profesores, setProfesores] = useState([]);
  const [filtroEspacio, setFiltroEspacio] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarProfesores = async () => {
    try {
      setLoading(true);
      const res = await getProfesores();
      setProfesores(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProfesores();
  }, []);

  // Lógica de filtrado ampliada: Busca por Nombre/Apellido, Títulos o Materias Habilitadas
  const profesoresFiltrados = profesores.filter((prof) => {
    const termino = filtroEspacio.trim().toLowerCase();
    if (!termino) return true;

    // 1. Coincidencia por Nombre, Apellido o DNI
    const coincideDatosPersonales = 
      `${prof.nombre} ${prof.apellido}`.toLowerCase().includes(termino) ||
      prof.dni.includes(termino);

    // 2. Coincidencia por Título
    const coincideTitulo = prof.TituloNomencladors?.some((titulo) =>
      titulo.nombreTitulo.toLowerCase().includes(termino)
    );

    // 3. Coincidencia por Materia / Espacio Curricular Habilitado
    const coincideMateriaHabilitada = prof.TituloNomencladors?.some((titulo) =>
      titulo.EspacioCurriculars?.some((materia) =>
        materia.nombreEspacio.toLowerCase().includes(termino)
      )
    );

    return coincideDatosPersonales || coincideTitulo || coincideMateriaHabilitada;
  });

  const handleCreateProfesor = async (nuevoProfesorData) => {
    await createProfesor(nuevoProfesorData);
    await cargarProfesores();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Listado de Profesores</h1>
            <p className="text-gray-500 text-sm">Postulaciones y relevamiento docente a nivel jurisdiccional</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow transition-colors flex items-center justify-center gap-2"
          >
            ➕ Nuevo Profesor
          </button>
        </div>

        {/* Buscador y Filtro */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            🔍 Filtrar por Docente, Título o Materia Habilitada:
          </label>
          <input
            type="text"
            placeholder="Ej. Programación, Matemática, María González, 35123456..."
            value={filtroEspacio}
            onChange={(e) => setFiltroEspacio(e.target.value)}
            className="w-full md:w-2/3 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>

        {/* Listado en Cards */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Cargando profesores...</div>
        ) : profesoresFiltrados.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No se encontraron profesores que coincidan con el criterio de búsqueda.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profesoresFiltrados.map((profesor) => (
              <ProfesorCard key={profesor.id} profesor={profesor} />
            ))}
          </div>
        )}

        {/* Formulario Modal */}
        <ProfesorModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleCreateProfesor}
        />

      </div>
    </div>
  );
};