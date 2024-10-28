
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../views/Modal';

const MoveList = ({ isOpen, onClose, item, isFile }) => {
  const [directories, setDirectories] = useState([]);
  const [selectedDirectory, setSelectedDirectory] = useState(null);
  const userId = localStorage.getItem('userId');
  const directoryId = localStorage.getItem('directoryId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/directories/subdirectories/${userId}/${directoryId}`);
        setDirectories(response.data);
      } catch (error) {
        console.error('Error fetching directories:', error);
      }
    };

    fetchData();
  }, [userId, directoryId]);

  const handleCheckboxChange = (event, directory) => {
    if (event.target.checked) {
      setSelectedDirectory(directory);
    } else {
      setSelectedDirectory(null);
    }
  };

  const handleMove = async () => {
    if (selectedDirectory) {
      try {
        let response;

        if (isFile && item && item._id) {
          response = await axios.post(`http://localhost:4000/api/files/move/${item._id}`, {
            newDirectoryId: selectedDirectory._id,
          });
          window.alert(`Archivo ${item.filename} movido exitosamente`);
        } else if (!isFile && item && item._id) {
          response = await axios.post(`http://localhost:4000/api/directories/moveSubdirectory`, {
            userId: userId,
            subdirectoryId: item._id,
            newParentDirectoryId: selectedDirectory._id,
          });
          window.alert(`Directorio ${item.name} movido exitosamente`);
        }

        console.log(response.data);
        window.location.reload();
        onClose(false);
      } catch (error) {
        console.error('Error al mover el elemento:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} className="flex ">
      <div className="w-[600px] text-gray-500 h-[250px] z-300 overflow-hidden">
        <h1 className='pb-4 text-xl font-semibold'>Mover </h1>
        <div className='grid gap-2 w-fulll h-[250px] text-lg font-medium overflow-y-scroll'>
          {directories.map(directory => (
            <div
              key={directory._id}
              className={`w-auto p-2 rounded-lg hover:bg-gray-300 flex items-center cursor-pointer ${selectedDirectory === directory ? 'bg-gray-300' : 'bg-white'
                }`}
            >
              <input
                id={`checkbox-${directory._id}`}
                type="checkbox"
                checked={selectedDirectory === directory}
                onChange={(event) => handleCheckboxChange(event, directory)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor={`checkbox-${directory._id}`} className="pl-2">
                {directory.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleMove}
        className='mt-4 bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-400 focus:outline-none focus:ring focus:border-teal-300 mr-2'
      >
        Mover
      </button>

    </Modal>
  );
};

export default MoveList;
