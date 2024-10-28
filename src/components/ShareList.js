
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../views/Modal';

const ShareList = ({ isOpen, onClose, userId, file }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      setSelectedUsers((prev) => [...prev, user]);
    } else {
      setSelectedUsers((prev) => prev.filter((selectedUser) => selectedUser._id !== user._id));
    }
  };

  const handleShareFile = async () => {
    if (selectedUsers.length > 0) {
      try {
        const selectedUserName = selectedUsers[0].name; // Tomar solo el primer nombre

        const response = await axios.post(`http://localhost:4000/api/files/share/${file._id}`, {
          sharedWith: selectedUserName,
        });

        console.log(response.data);
        window.alert(`Archivo ${file.filename} compartido exitosamente`);
        onClose(false);
      } catch (error) {
        console.error('Error al compartir el archivo:', error);
      }
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)} className="flex w-[400px] ">
      <div className="w-[400px] text-gray-500">
        <h1 className='pb-4 text-xl font-semibold'>Compartir Archivo</h1>
        <ul className='grid gap-2 w-full text-lg font-medium'>
          {users.map((user) => (
            <li
              key={user._id}
              className={`w-full p-2 rounded-lg hover:bg-gray-300 flex items-center cursor-pointer ${selectedUsers.find((selectedUser) => selectedUser._id === user._id) ? 'bg-gray-300' : 'bg-white'
                }`}
            >
              <input
                id={`checkbox-${user._id}`}
                type="checkbox"
                checked={selectedUsers.find((selectedUser) => selectedUser._id === user._id) !== undefined}
                onChange={(event) => handleCheckboxChange(event, user)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor={`checkbox-${user._id}`} className="pl-2">
                {user.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleShareFile}
        className='mt-4 bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-400 focus:outline-none focus:ring focus:border-teal-300 mr-2'
      >
        Compartir
      </button>
    </Modal>
  );
};

export default ShareList;
