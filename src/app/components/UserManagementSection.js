import React, { useState, useEffect } from 'react';
import { Users, UserPlus, AlertCircle } from 'lucide-react';

const UserManagementSection = ({ token, isDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        'https://backend-hackaton-production-f38b.up.railway.app/v1/api/users',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
        setError('Error al obtener la lista de usuarios');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error de conexión al obtener usuarios');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://backend-hackaton-production-f38b.up.railway.app/v1/api/users/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ username, password, role }),
        }
      );

      if (response.ok) {
        setSuccess('Usuario creado exitosamente');
        setUsername('');
        setPassword('');
        setRole('');
        fetchUsers(); // Refresh user list
      } else {
        const data = await response.json();
        setError(data.message || 'Error al crear el usuario');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };

  const cardClass = `bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`;
  const inputClass = `w-full p-2 rounded-md border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`;
  const buttonClass = `w-full p-2 rounded-md bg-green-500 text-white font-bold hover:bg-green-600 transition duration-300`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={cardClass}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <UserPlus className="w-6 h-6 mr-2" />
          Crear Nuevo Usuario
        </h3>
        <form onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Nombre de usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium mb-1">
              Rol
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>
          <button type="submit" disabled={isLoading} className={buttonClass}>
            {isLoading ? 'Creando...' : 'Crear Usuario'}
          </button>
        </form>
        {error && (
          <div className="mt-4 p-2 rounded-md bg-red-100 text-red-700 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="mt-4 p-2 rounded-md bg-green-100 text-green-700 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>{success}</p>
          </div>
        )}
      </div>
      
      <div className={cardClass}>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Usuarios Existentes
        </h3>
        {users.length > 0 ? (
          <ul className="space-y-2">
            {users.map(user => (
              <li key={user.id} className="flex justify-between items-center p-2 rounded-md bg-gray-100 dark:bg-gray-700">
                <span>{user.username}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user.role}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No hay usuarios para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default UserManagementSection;