import React, { useState } from "react";
import {
  Users,
  UserPlus,
  AlertCircle,
  Leaf,
  ChevronRight,
  Search,
  Trash2,
} from "lucide-react";
import useUserManagement from "./useUserManagement";
import ConfirmationModal from "./ConfirmationModal";

const UserManagementSection = ({ token, isDarkMode }) => {
  const {
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
  } = useUserManagement(token);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const cardClass = `${
    isDarkMode ? "bg-gray-800" : "bg-white"
  } rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`;
  const inputClass = `w-full p-3 rounded-md ${
    isDarkMode
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-gray-50 border-gray-300 text-gray-900"
  } border focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300`;
  const buttonClass =
    "w-full p-3 rounded-md bg-green-500 text-white font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105";
  const labelClass = `block text-sm font-medium mb-2 ${
    isDarkMode ? "text-gray-300" : "text-gray-700"
  }`;

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      const deleted = await deleteUser(userToDelete.id);
      if (deleted) {
        console.log("Usuario eliminado exitosamente");
      } else {
        console.log("Error al eliminar el usuario");
      }
    }
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="space-y-8">
      <div className={cardClass}>
        <div className="bg-green-500 text-white p-6">
          <h2 className="text-2xl font-bold flex items-center">
            <UserPlus className="w-8 h-8 mr-3" />
            Gestión de Usuarios
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <UserPlus className="w-6 h-6 mr-2 text-green-500" />
              Crear Nuevo Usuario
            </h3>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label htmlFor="username" className={labelClass}>
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Ingrese el nombre de usuario"
                />
              </div>
              <div>
                <label htmlFor="password" className={labelClass}>
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Ingrese la contraseña"
                />
              </div>
              <div>
                <label htmlFor="role" className={labelClass}>
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
                  <option value="Supervisor">Supervisor</option>
                  <option value="Cuidador">Cuidador</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={buttonClass}
              >
                {isLoading ? "Creando..." : "Crear Usuario"}
              </button>
            </form>
            {error && (
              <div className="mt-4 p-3 rounded-md bg-red-100 text-red-700 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 rounded-md bg-green-100 text-green-700 flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                <p>{success}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="w-6 h-6 mr-2 text-green-500" />
              Usuarios Existentes
            </h3>
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className={`${inputClass} pl-10`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div
              className={`max-h-96 overflow-y-auto ${
                isDarkMode ? "scrollbar-dark" : "scrollbar-light"
              }`}
            >
              {users.length > 0 ? (
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className={`flex justify-between items-center p-3 rounded-md ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      } transition-all duration-300`}
                    >
                      <span className="flex items-center">
                        <Leaf className="w-5 h-5 mr-3 text-green-500" />
                        <span
                          className={
                            isDarkMode ? "text-gray-200" : "text-gray-700"
                          }
                        >
                          {user.username}
                        </span>
                      </span>
                      <div className="flex items-center">
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${
                            user.role === "Administrador"
                              ? "bg-purple-200 text-purple-800"
                              : "bg-blue-200 text-blue-800"
                          }`}
                        >
                          {user.role}
                        </span>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="ml-2 p-1 rounded-full hover:bg-red-100 transition-colors duration-300"
                          title="Eliminar usuario"
                        >
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </button>
                        <ChevronRight
                          className={`w-5 h-5 ml-2 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  className={`text-center py-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  No hay usuarios para mostrar.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isDarkMode={isDarkMode}
        title="Confirmar eliminación de planta"
        message="¿Estás seguro de que quieres eliminar esta planta? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  );
};

export default UserManagementSection;
