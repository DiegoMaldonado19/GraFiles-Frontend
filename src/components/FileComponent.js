
import React, { useState, useEffect } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import { Link } from "react-router-dom";
import ImgTXT from "../assets/txtimg.png";
import ImgHTML from "../assets/htmlimg.png";
import {
  FaEllipsisV,
  FaRegCopy,
  FaArrowsAlt,
  FaTrash,
  FaShare,
} from "react-icons/fa";
import { Button } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { Grow } from '@mui/material';
import { Paper } from '@mui/material';
import { Popper } from '@mui/material';
import { MenuItem } from '@mui/material';
import { MenuList } from '@mui/material';
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

const FileComponent = ({ file, isMoveListOpen, setIsMoveListOpen, directories, setSelectedFile,isShareListOpen,setIsShareListOpen }) => {
  const { _id, filename, extension, content, createdAt } = file;
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);

  const userId = localStorage.getItem("userId");


  const handleOpenEditor = () => {
    setIsEditorVisible(true);
  };

  const handleCloseEditor = () => {
    setIsEditorVisible(false);
  };

  const handleUpdateContent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/files/files/${_id}/${filename}`
      );

      setUpdatedContent(response.data.content);
    } catch (error) {
      console.error("Error al obtener el archivo actualizado:", error);
    }
  };

  useEffect(() => {
    setUpdatedContent(content);
  }, [content]);

  //menu
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleCopy = async (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    if (open) {
      if (event.currentTarget.innerText === "Copiar") {
        try {
          await axios.post(
            `http://localhost:4000/api/files/copy/${file._id}`
          );
          window.location.reload();
        } catch (error) {
          console.error("Error al copiar el archivo:", error);
        }
      }
      setOpen(false);
    }
  };
//mover
  const handleOpenMoveList = () => {
    setIsMoveListOpen((prev) => {

      if (prev) {
        setIsMoveListOpen(false);
      }
      return !prev;
    });
    setSelectedFile(file);
  };
  // compartit
  const handleShared = () => {
    setIsShareListOpen((prev) => {

      if (prev) {
        setIsShareListOpen(false);
      }
      return !prev;
    });
    setSelectedFile(file);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este archivo?");

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/api/files/delete/${_id}`);
        // Recargar la página o realizar alguna acción adicional después de la eliminación
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar el archivo:", error);
      }
    }
  };

  const fechaFormateada = format(new Date(createdAt), 'dd/MM/yyyy HH:mm:ss');
  return (
    <div className="bg-gray-100 z-0 rounded-xl drop-shadow-sm border h-[200px] w-[220px]  grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">
      <div className="text-red-400 flex justify-self-end pt-4 pr-2">
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <FaEllipsisV />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                      className="text-gray-700"
                    >
                      <MenuItem onClick={handleCopy} className="flex gap-2">
                        <FaRegCopy />Copiar
                      </MenuItem>
                      <MenuItem
                        onClick={handleOpenMoveList}
                        className="flex gap-2"
                      >
                        <FaArrowsAlt />Mover
                      </MenuItem>
                      <MenuItem onClick={handleShared} className="flex gap-2">
                        <FaShare />Compartir
                      </MenuItem>
                      <MenuItem onClick={handleDelete} className="flex gap-2">
                        <FaTrash />Eliminar
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>

      <Link
        to={`/editor/${_id}/${userId}/${filename}`}
        className="h-full w-full cursos-pointer text-sm px-4"
      >
        <div className="bg-orange-300n grid grid-cols-1">
          <div className="overflow-hidden flex ">
            <div>
              <p className="text-gray-700 font-bold h-auto">{filename}</p>
              <p className="text-gray-500 ">{fechaFormateada}</p>
            </div>
          </div>
          <div className="bg-blue-100n grid place-content-center">
            <img
              src={getFileImage(extension)}
              alt="Imagen de fondo"
              width={70}
              height={70}
            />
          </div>
          <div>
            {isEditorVisible && (
              <div className="bg-blue-400m">
                <TextEditor
                  fileId={_id}
                  content={updatedContent}
                  onClose={() => {
                    handleCloseEditor();
                    handleUpdateContent();
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Link>


    </div>
  );
};

export default FileComponent;
