
import React, { useState, useEffect } from "react";
import CreateFile from "./CreateFile";
import CreateDirectory from "./CreateDirectory";
import Modal from "../views/Modal";
import NewUSer from "./NewUser";
import { FaFileAlt, FaTrash, FaFolder, FaUserFriends, FaUserPlus } from 'react-icons/fa';


function Navbar() {
  // Usa el estado para controlar la visibilidad del modal de Crear Archivo
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [directoryId, setDirectoryId] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const storedUserRole = localStorage.getItem('userRole');
    setUserRole(storedUserRole);
  }, []);

  const openCreateFileModal = () => {
    setIsCreateFileModalOpen(true);
  };

  const closeCreateFileModal = () => {
    setIsCreateFileModalOpen(false);
  };

  //modal directory---------------------------------------------
  const [isCreateDirectoryModalOpen, setIsCreateDirectoryModalOpen] = useState(false);
  const openCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(true);
  };

  const closeCreateDirectoryModal = () => {
    setIsCreateDirectoryModalOpen(false);
  };

  //modal share folder---------------------------------------------
  const [isCreateShareModalOpen, setIsCreateShareModalOpen] = useState(false);
  const openCreateShareModal = () => {
    setIsCreateShareModalOpen(true);
  };

  const closeCreateShareModal = () => {
    setIsCreateShareModalOpen(false);
  };


  //modal nuevo user---------------------------------------------
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const openCreateUserModal = () => {
    setIsCreateUserModalOpen(true);
  };

  const closeCreateUserModal = () => {
    setIsCreateUserModalOpen(false);
  };

  // Editor de texto---------------------------------------------
  const openNewDocumentTab = () => {
    const urlParts = window.location.pathname.split('/');
    const newDirectoryId = urlParts.length >= 3 ? urlParts[2] : localStorage.getItem('directoryId');
    setDirectoryId(newDirectoryId);

    const newDocumentUrl = `/editor/${newDirectoryId}/nuevo-documento`;
    const newWindow = window.open(newDocumentUrl, "_blank");

    // Esperar a que la nueva ventana se cargue completamente
    const checkWindowLoaded = () => {
      if (newWindow && newWindow.document && newWindow.document.readyState === 'complete') {
        // Puedes intentar acceder al contenido aquí
        newWindow.postMessage({ type: 'getDocumentContent' }, window.origin);
      } else {
        // Si la ventana no está cargada, espera un poco y verifica nuevamente
        setTimeout(checkWindowLoaded, 100);
      }
    };

    // Iniciar la verificación de carga de la ventana
    checkWindowLoaded();
  };
  // Verifica si el directoryId no está en la URL y está almacenado en el localStorage
  useEffect(() => {
    const urlParts = window.location.pathname.split('/');
    const newDirectoryId = urlParts.length >= 3 ? urlParts[2] : localStorage.getItem('directoryId');
    setDirectoryId(newDirectoryId);
  }, []);

//sharedilfes
const handleShare = () => {
  window.location.href = '/sharedirectory';
};
const handlePaperBin = () => {
  window.location.href = '/paperbin';
};
const handleGoToMain = () => {
  if (userRole === 'Administrador') {
    window.location.href = '/admin';
  }
  else {
    window.location.href = '/empleado';
  }
};
  return (
    <div className="bg-[#F6F5F5] w-[100%] grid grid-cols-1 place-content-start justify-items-center gap-2 p-2 text-lg text-gray-600">


      {/*CREATE DOCUMENT */}
      <div className="bg-blue-100n grid place-content-center p-4 cursor-pointer">
      </div>

      {/*CREATE DOCUMENT */}
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
        onClick={openNewDocumentTab}
      >
        <FaFileAlt className="text-gray-600" />
        <p className="pl-2"> Nuevo Documento</p>
      </div>

      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4 "
        onClick={openCreateFileModal}
      >
        <FaFileAlt className="text-gray-600 " />
        <p className="pl-2"> Crear Archivo</p>
      </div>
      {/* Renderiza el componente CreateFile dentro del modal */}
      <Modal isOpen={isCreateFileModalOpen} onClose={closeCreateFileModal}>
        <CreateFile />
      </Modal>

      {/*CREATE DIRECTORY */}
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
        onClick={openCreateDirectoryModal}
      >
        <FaFolder className="text-gray-600 " />
        <p className="pl-2"> Crear Directorio</p>
      </div>
      <Modal isOpen={isCreateDirectoryModalOpen} onClose={closeCreateDirectoryModal}>
        <CreateDirectory />
      </Modal>

      {/*CREATE Users*/}
      {userRole === 'Administrador' && (
        <div
          className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
          onClick={openCreateUserModal}
        >
          <FaUserPlus className="text-gray-600" />
          <p className="pl-2"> Crear Usuario</p>
        </div>
      )}
      <Modal isOpen={isCreateUserModalOpen} onClose={closeCreateUserModal}>
        <NewUSer />
      </Modal>
      {/*CREATE SHARE FILES*/}
      <div
        className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
        onClick={handleShare}
      >
        <FaUserFriends className="text-gray-600 " />
        <p className="pl-2"> Compartidos</p>
      </div>

      {/*CREATE PAPER BIN */}
      {userRole === 'Administrador' && (
        <div
          className="h-[25px] w-full cursor-pointer hover:bg-gray-300 rounded-xl mx-2 flex items-center p-4"
          onClick={handlePaperBin}
        >
          <FaTrash className="text-gray-600" />
          <p className="pl-2"> Papelera</p>
        </div>
      )}

    </div>
  );
}

export default Navbar;
