
import React, { useEffect, useState } from "react";
import axios from "axios";
import FileShareComponent from "./FileShareComponent";

const FileShareList = () => {
  const userId = localStorage.getItem("userId");
  const [sharedFiles, setSharedFiles] = useState([]);

  useEffect(() => {
    const apiEndpoint = `http://localhost:4000/api/files/shared-files/${userId}`;

    axios
      .get(apiEndpoint)
      .then((response) => {
        setSharedFiles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener archivos compartidos:", error);
      });
  }, [userId]);

  return (
    <div className="w-full">
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2">
        {sharedFiles.map((sharedFile) => (
          <FileShareComponent key={sharedFile.file._id} file={sharedFile} />
        ))}
      </div>
    </div>
  );
};

export default FileShareList;
