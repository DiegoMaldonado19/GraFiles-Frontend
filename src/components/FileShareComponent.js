
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash,FaEllipsisV } from "react-icons/fa";
import ImgTXT from "../assets/txtimg.png";
import ImgHTML from "../assets/htmlimg.png";
import TextEditorRead from "./TextEditorRead";
import axios from "axios";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
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

const FileShareComponent = ({ file }) => {
  const { _id, user_id, filename, extension, content, createdAt } = file.file;
  const { sharedBy } = file;
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(file.file.content); // Sin ".file" aquí

  const [isVisible, setIsVisible] = useState(() => {
    const storedVisibility = localStorage.getItem(`fileVisibility_${_id}`);
    return storedVisibility !== null ? JSON.parse(storedVisibility) : true;
  });

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


    const handleDelete = () => {
      const userConfirmed = window.confirm("¿Está seguro de que desea eliminar este archivo?");
      if (userConfirmed) {
        setIsVisible(false);
        localStorage.setItem(`fileVisibility_${_id}`, JSON.stringify(false));
      }
    };

    if (!isVisible) {
      return null;
    }
    const fechaFormateada = format(new Date(createdAt), 'dd/MM/yyyy HH:mm:ss');

  return (
    <div className="bg-gray-100 rounded-xl drop-shadow-sm border h-[200px] w-[220px] grid grid-cols-1 text-lg place-content-start justify-items-center hover:bg-gray-300">
      <div className="text-red-400 flex justify-self-end pt-4 pr-2">
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

                  <Link to={`/editorRead/${_id}/${user_id}/${filename}`} className="h-full w-full cursor-pointer text-sm px-4">
                    <div className="bg-orange-300n grid grid-cols-1">
                      <div className="overflow-hidden flex ">
                        <div>
                          <p className="text-gray-700 font-bold h-auto">{filename}</p>
                          <p className="text-gray-500 ">{fechaFormateada}</p>

                          <p className="text-gray-500">Compartido por: {sharedBy}</p>
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
                            <TextEditorRead
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

                export default FileShareComponent;
