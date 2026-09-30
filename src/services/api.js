// const API_URL = 'http://localhost:3000/api/v1';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
export const getProfesores = async () => {
  const response = await fetch(`${API_URL}/profesores`);
  if (!response.ok) throw new Error('Error al obtener los profesores');
  return await response.json();
};

export const createProfesor = async (profesorData) => {
  const response = await fetch(`${API_URL}/profesores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profesorData)
  });
  if (!response.ok) throw new Error('Error al registrar el profesor');
  return await response.json();
};