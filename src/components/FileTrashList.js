import React, { useEffect, useState } from "react";
import axios from "axios";
import FileTrashComponent from "./FileTrashComponent";

const FileTrashList = () => {
  const [deletedFiles, setDeletedFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/trash/deleted-files")
      .then((response) => {
        setDeletedFiles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener archivos eliminados:", error);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 place-content-start justify-items-center gap-2 pt-2">
        {deletedFiles.map((deletedFile) => (
          <FileTrashComponent key={deletedFile._id} file={deletedFile} />
        ))}
      </div>
    </div>
  );
};

export default FileTrashList;