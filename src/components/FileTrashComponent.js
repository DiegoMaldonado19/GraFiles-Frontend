
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImgTXT from "../assets/txtimg.png";
import ImgHTML from "../assets/htmlimg.png";
import TextEditor from "./TextEditor";
import axios from "axios";
import { format } from 'date-fns';

const getFileImage = (extension) => {
  switch (extension) {
    case ".txt":
      return ImgTXT;
    case ".html":
      return ImgHTML;
    default:
      return null;
  }
};
const FileTrashComponent = ({ file }) => {
  const { _id, filename, extension, user_id, createdAt } = file;
  const [deletedByUserName, setDeletedByUserName] = useState("Desconocido");

  useEffect(() => {
    // Obtener el nombre del usuario que eliminó el archivo
    axios
      .get(`http://localhost:4000/api/users/${user_id}`)
      .then((response) => {
        setDeletedByUserName(response.data.name);
      })
      .catch((error) => {
        console.error("Error al obtener el nombre del usuario:", error);
      });
  }, [user_id]);

  const fechaFormateada = format(new Date(createdAt), 'dd/MM/yyyy HH:mm:ss');

  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm border h-[200px] w-[220px] grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">
      <Link to={`/editorRead/${_id}/${user_id}/${filename}`} className="h-full w-full cursor-pointer text-sm p-4">
        <div className="bg-orange-300n grid grid-cols-1">
          <div className="overflow-hidden flex">
            <div>
              <p className="text-gray-700 font-bold h-auto">{filename}</p>
              <p className="text-gray-500 ">{fechaFormateada}</p>
              <p className="text-gray-500">Eliminado por: {deletedByUserName}</p>
              <div className="bg-blue-100n grid place-content-center">
            <img
              src={getFileImage(extension)}
              alt="Imagen de fondo"
              width={70}
              height={70}
            />
          </div>
            </div>
          </div>
          <div className="bg-blue-100n grid place-content-center">
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FileTrashComponent;
