import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', formData);

      console.log('Inicio de sesión exitoso:', response.data);

      // Almacena los datos relevantes en localStorage
      localStorage.setItem('userId', response.data.user._id);

      // Obtiene el directorio principal del usuario
      const directoriesResponse = await axios.get(`http://localhost:4000/api/directories/${response.data.user._id}`);
      const mainDirectoryId = directoriesResponse.data[0]._id;

      // Almacena el ID del directorio principal en localStorage
      localStorage.setItem('directoryId', mainDirectoryId);

      // Redirige al usuario según su rol
      if (response.data.user.rol === 'Administrador') {
        localStorage.setItem('userRole', 'Administrador');
        window.location.href = '/admin';
      } else if (response.data.user.rol === 'Empleado') {
        localStorage.setItem('userRole', 'Empleado');
        window.location.href = '/empleado';
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: error.response.data.message,
      });

    }
  };


  return (
    <section className="bg-white white:bg-dark-900">
      <div className="flex justify-center min-h-screen">
        <div className=" w-2/5 grid justify-items-center  place-content-center bg-gray-100" >
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-dark-800 capitalize white:text-white">
              Bienvenido!
            </h1>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm text-dark-600 white:text-dark-200">Correo electrónico</label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="johnarch@example.com"
                  className="block w-full px-5 py-3 mt-2 text-dark-700 placeholder-dark-400 bg-white border border-dark-200 rounded-lg white:placeholder-dark-600 white:bg-dark-900 white:text-dark-300 white:border-dark-700 focus:border-blue-400 white:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-dark-600 white:text-dark-200">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-dark-700 placeholder-dark-400 bg-white border border-dark-200 rounded-lg white:placeholder-dark-600 white:bg-dark-900 white:text-dark-300 white:border-dark-700 focus:border-blue-400 white:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                <span>Ingresar </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;