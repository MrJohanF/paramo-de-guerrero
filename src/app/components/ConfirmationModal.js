import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, isDarkMode }) => {
  if (!isOpen) return null;

  const overlayClass = `fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center`;
  const modalClass = `${
    isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
  } p-6 rounded-lg shadow-xl max-w-sm w-full mx-4`;
  const buttonClass = `px-4 py-2 rounded-md font-medium transition-colors duration-300`;

  return (
    <div className={overlayClass}>
      <div className={modalClass}>
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-lg font-semibold">Confirmar eliminación</h3>
        </div>
        <p className="mb-6">¿Estás seguro de que quieres eliminar ? Esta acción no se puede deshacer.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`${buttonClass} ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={`${buttonClass} bg-red-500 hover:bg-red-600 text-white`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;