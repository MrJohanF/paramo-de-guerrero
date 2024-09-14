import { useState, useEffect } from 'react';

const useUserManagement = (token) => {
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

  const deleteUser = async (userId) => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://backend-hackaton-production-f38b.up.railway.app/v1/api/users/delete/${userId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSuccess('Usuario eliminado exitosamente');
        fetchUsers(); // Refresh user list
        return true;
      } else {
        const data = await response.json();
        setError(data.message || 'Error al eliminar el usuario');
        return false;
      }
    } catch (error) {
      setError('Error de conexión al intentar eliminar el usuario');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    error,
    success,
    isLoading,
    users,
    handleCreateUser,
    deleteUser,
  };
};

export default useUserManagement;