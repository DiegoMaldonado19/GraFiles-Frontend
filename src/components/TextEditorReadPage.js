
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextEditorRead from "./TextEditorRead";
import axios from "axios";
import { FaFileAlt, FaBookOpen, FaArrowLeft } from 'react-icons/fa';
import { Alert } from '@mui/lab';



function TextEditorReadPage() {
  const { userId, filename, fileId } = useParams();
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/files/files/${userId}/${filename}`);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error al obtener el contenido del archivo:", error);
      }
    };

    fetchData();
  }, [userId, filename]);


  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="fixed top-0 inset-0 grid grid-cols-1 place-content-start justify-items-center bg-gray-200 bg-opacity-40 overflow-y-scroll">
        <div className="flex items-center h-[100px] pl-4 text-2xl text-gray-600">
          <div className="pr-2 text-[#4592AF]"><FaFileAlt /></div>
          <p>{filename} </p>
          <p className="text-gray-400 pl-2"> - Compartido</p>
        </div>
          <div className="flex items-center text-xl text-[#33313B] bg-[#E3C4A8] px-12 py-4 rounded-lg" >
          <div className="pr-2 text-[#4592AF]"><FaBookOpen /></div>
            Modo Lectura
          </div>
        <div
          className="cursor-pointer hover:bg-gray-300 ease-in text-2xl rounded-full h-[50px] w-[50px] mx-8 flex items-center text-center justify-center justify-self-start "
          onClick={handleGoBack}
        >
          <FaArrowLeft />
        </div>
        <TextEditorRead fileId={fileId} content={content} onContentChange={setContent} />
      </div>
    </div>
  );
}

export default TextEditorReadPage;
