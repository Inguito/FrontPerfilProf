import React, { useState } from 'react';

export const ProfesorModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    telefono: '',
    correoElectronico: '',
    anoEgreso: '',
    cvAdjuntoUrl: '',
    dniAdjuntoUrl: '',
    localidadesPostulacion: ''
  });

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        ...formData,
        anoEgreso: formData.anoEgreso ? parseInt(formData.anoEgreso) : null,
        localidadesPostulacion: formData.localidadesPostulacion
          ? formData.localidadesPostulacion.split(',').map(id => parseInt(id.trim()))
          : []
      };

      await onSuccess(payload);
      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar los datos');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Alta de Nuevo Profesor</h2>

        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">DNI *</label>
              <input type="text" name="dni" required value={formData.dni} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input type="email" name="correoElectronico" required value={formData.correoElectronico} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre *</label>
              <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellido *</label>
              <input type="text" name="apellido" required value={formData.apellido} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Año Egreso</label>
              <input type="number" name="anoEgreso" value={formData.anoEgreso} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Localidades (IDs separados por coma)</label>
            <input type="text" name="localidadesPostulacion" placeholder="Ej: 1, 3, 5" value={formData.localidadesPostulacion} onChange={handleChange} className="w-full border rounded p-2 text-sm" />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar Profesor</button>
          </div>
        </form>
      </div>
    </div>
  );
};