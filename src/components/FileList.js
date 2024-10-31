
import React, { useEffect, useState } from "react";
import axios from "axios";
import FileComponent from "./FileComponent";
import { useParams } from "react-router-dom";
import MoveList from "./MoveList";
import ShareList from "./ShareList";

const FileList = () => {
  const { directoryId } = useParams();
  const [files, setFiles] = useState([]);
  const [isMoveListOpen, setIsMoveListOpen] = useState(false);
  const [isShareListOpen, setIsShareListOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [directories, setDirectories] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const directoryroot = localStorage.getItem("directoryId");

    const apiEndpoint = `http://localhost:4000/api/files/directory/${directoryroot}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        // Filtrar archivos eliminados
        const filteredFiles = response.data.filter((file) => !file.deleted);
        setFiles(filteredFiles);
      })
      .catch((error) => {
        console.error("Error al obtener archivos del directorio:", error);
      });

    // También obtenemos los directorios aquí
    axios
      .get(`http://localhost:4000/api/directories/subdirectories/${userId}/${directoryroot}`)
      .then((response) => {
        setDirectories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching directories:', error);
      });
  }, [directoryId, userId]);

  return (
    <div className="w-full">
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2 ">
        {files.map((file) => (
          <FileComponent
            key={file._id}
            file={file}
            isMoveListOpen={isMoveListOpen}
            setIsMoveListOpen={setIsMoveListOpen}
            directories={directories}
            setSelectedFile={setSelectedFile}
            isShareListOpen={isShareListOpen}
            setIsShareListOpen={setIsShareListOpen}
          />
        ))}
      </div>
      <MoveList
        isOpen={isMoveListOpen}
        onClose={setIsMoveListOpen}
        userId={userId}
        directoryId={directoryId}
        item={selectedFile}
        isFile={true}
      />

      <ShareList
        isOpen={isShareListOpen}
        onClose={setIsShareListOpen}
        userId={userId}
        file={selectedFile}
      />
    </div>
  );
};

export default FileList;
