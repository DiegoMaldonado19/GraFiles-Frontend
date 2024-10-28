import React from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center bg-gray-500 bg-opacity-40 ease-in-out duration-300 justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;