import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

function CreateFile() {
  const { directoryId } = useParams();
  const [formData, setFormData] = useState({
    filename: '',
    extension: '.txt',
    shared: false,
    content: '',
  });
  const [createdFile, setCreatedFile] = useState(null);

  useEffect(() => {
    // Si el directoryId no está presente en la URL, intenta obtenerlo del localStorage
    if (!directoryId) {
      const storedDirectoryId = localStorage.getItem('directoryId');
      if (storedDirectoryId) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          directoryId: storedDirectoryId,
        }));
      }
    }
  }, [directoryId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = () => {
    setFormData({
      ...formData,
      shared: !formData.shared,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem('userId');
      const currentDirectoryId = formData.directoryId || directoryId;

      if (!currentDirectoryId) {
        throw new Error("DirectoryId no encontrado");
      }

      const path = `/archivo/${userId}/${formData.filename}${formData.extension}`;

      const formDataForRequest = {
        filename: formData.filename,
        extension: formData.extension,
        shared: formData.shared,
        user_id: userId,
        path: path,
        createdAt: new Date(),
        updatedAt: new Date(),
        directory_id: currentDirectoryId,
      };

      const response = await axios.post('http://localhost:4000/api/files/create', {
        ...formDataForRequest,
        content: ' ',
      });

      console.log('Archivo creado exitosamente:', response.data);
      setCreatedFile({
        path: path,
        content: ' ',
      });
      // Muestra el mensaje de éxito con SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Archivo creado',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error al crear el archivo:', error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Crear Archivo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm">Nombre del Archivo</label>
          <input
            type="text"
            name="filename"
            value={formData.filename}
            onChange={handleChange}
            placeholder="Nombre del archivo"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm">Tipo de Archivo</label>
          <select
            name="extension"
            value={formData.extension}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value=".txt">TXT</option>
            <option value=".html">HTML</option>
          </select>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="shared"
            checked={formData.shared}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="text-sm">Compartir Archivo</label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300"
        >
          Crear Archivo
        </button>
      </form>
    </div>
  );
}

export default CreateFile;