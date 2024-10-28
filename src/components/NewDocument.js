
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import {
  FaFileAlt,
  FaSave,
  FaShareAlt,
  FaTrashAlt,
  FaArrowLeft,
} from "react-icons/fa";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NewDocument() {
  const [documentName, setDocumentName] = useState("");
  const [selectedExtension, setSelectedExtension] = useState(".txt");
  const [content, setContent] = useState("");
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [isNameAlertVisible, setNameAlertVisible] = useState(false);

  const navigate = useNavigate();

  const { directoryId } = useParams();
  const fileName = `${documentName}`;
  const user_id = localStorage.getItem("userId");

  const handleBeforeUnload = (event) => {
    const message =
      "¿Seguro que quieres salir? Los cambios no se guardarán.";
    event.returnValue = message;
    return message;
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSave = async () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);

    if (!documentName.trim()) {
      // Si el nombre del documento está en blanco, muestra la alerta y no guarda
      setNameAlertVisible(true);
      return;
    }

    const path = `/archivo/${user_id}/${fileName}${selectedExtension}`;
    try {
      const response = await axios.post(
        "http://localhost:4000/api/files/create",
        {
          filename: fileName,
          extension: selectedExtension,
          user_id: user_id,
          path: path,
          shared: false,
          content,
          directory_id: directoryId,
        }
      );

      console.log("Documento guardado:", response.data);
      setAlertVisible(true);
      setTimeout(() => {
        navigate(`/editor/${response.data._id}/${user_id}/${fileName}`);
      }, 2000);
    } catch (error) {
      console.error("Error al guardar el documento:", error);
    }
  };

  return (
    <div className="fixed top-0 inset-0 grid grid-cols-1 place-content-start justify-items-center bg-gray-200 bg-opacity-40 overflow-y-scroll">
      <div className="flex items-center h-[100px] pl-4 text-2xl text-gray-600">
        <div className="pr-2"><FaFileAlt /></div>
        <input
          type="text"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          placeholder="Nombre del documento"
          className="mr-2 px-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
        />
        <select
          value={selectedExtension}
          onChange={(e) => setSelectedExtension(e.target.value)}
          className="mx-2 border-b border-gray-400 focus:outline-none focus:border-blue-500"
        >
          <option value=".txt">.txt</option>
          <option value=".html">.html</option>
        </select>

        <div className="px-2 hover:text-[#4592AF]" onClick={handleSave}>
          <FaSave />
        </div>



        <div className="px-2 hover:text-red-500"><FaTrashAlt /></div>
      </div>
      {isAlertVisible && (
        <Alert severity="success" onClose={() => setAlertVisible(false)}>
          Contenido guardado exitosamente
        </Alert>
      )}
       {isNameAlertVisible && (
          <Alert severity="error" onClose={() => setNameAlertVisible(false)}>
            Por favor, ingrese un nombre para el documento.
          </Alert>
        )}
      <div className="cursor-pointer hover:bg-gray-300 ease-in text-2xl rounded-full h-[50px] w-[50px] mx-8 flex items-center text-center justify-center justify-self-start">
        <FaArrowLeft />
      </div>

      <TextEditor
        fileId={undefined}
        value={" "}
        content={content} onContentChange={setContent}
        onClose={() => { }}
      />
    </div>
  );
}

export default NewDocument;
