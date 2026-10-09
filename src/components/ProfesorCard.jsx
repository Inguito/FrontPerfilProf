import React from 'react';

export const ProfesorCard = ({ profesor }) => {
  // Extraer las materias asignadas a los títulos del profesor
  const materiasHabilitadas = profesor.TituloNomencladors?.flatMap(titulo => 
    (titulo.EspacioCurriculars || []).map(materia => ({
      id: materia.id,
      nombreEspacio: materia.nombreEspacio,
      // Intenta obtener el tipo desde Sequelize o asigna 'DOCENTE' por defecto
      tipoHabilitacion: materia.Habilitacion?.tipoHabilitacion  // || 'Docente'
    }))
  ) || [];

  // Filtrar duplicados
  const materiasUnicas = Array.from(
    new Map(materiasHabilitadas.map(m => [m.id, m])).values()
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-6 flex flex-col justify-between">
      <div>
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-800">
            {profesor.nombre} {profesor.apellido}
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-medium">
            DNI: {profesor.dni}
          </span>
        </div>

        {/* Datos de contacto */}
        <div className="space-y-1.5 text-sm text-gray-600 mt-3">
          <p><strong>📧 Email:</strong> {profesor.correoElectronico}</p>
          <p><strong>📞 Teléfono:</strong> {profesor.telefono || 'No registrado'}</p>
        </div>

        {/* Materias Habilitadas - Estructura en Bloque Vertical */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <h4 className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            📚 Materias Habilitadas:
          </h4>
          
          {materiasUnicas.length > 0 ? (
            <div className="flex flex-col gap-2">
              {materiasUnicas.map((m) => (
                <div 
                  key={m.id} 
                  className="bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex flex-col items-start gap-1"
                >
                  <span className="text-sm font-bold text-emerald-950">
                    {m.nombreEspacio}
                  </span>
                  <span className="bg-emerald-200 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                    {m.tipoHabilitacion}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 italic">Sin materias habilitadas asignadas</p>
          )}
        </div>
      </div>
    </div>
  );
};