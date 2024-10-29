
import React from "react";
import axios from "axios";
import { FaUserCircle, FaLock, FaPowerOff } from 'react-icons/fa';
import { Button } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { Grow } from '@mui/material';
import { Paper } from '@mui/material';
import { Popper } from '@mui/material';
import { MenuItem } from '@mui/material';
import { MenuList } from '@mui/material';
import Modal from "../views/Modal";
import { Alert } from '@mui/lab';


const TopNavbar = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [isAlertVisible, setAlertVisible] = React.useState(false);
  const [isWrongPasswordAlertVisible, setWrongPasswordAlertVisible] = React.useState(false);
  const [timerId, setTimerId] = React.useState(null);
  const [isChangingPassword, setChangingPassword] = React.useState(false);
  const [username, setUsername] = React.useState('');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('directoryId');
    localStorage.removeItem('userRole');
    window.location.href = '/';
  };

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
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const fetchUsername = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
      const fetchedUsername = response.data.name;
      setUsername(fetchedUsername);
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
    }
  };

  React.useEffect(() => {
    fetchUsername();
  }, []);

  const handleChangePassword = async () => {
    try {
      setChangingPassword(true);

      const user_id = localStorage.getItem('userId');
      const response = await axios.post('http://localhost:4000/api/users/change-password', {
        user_id,
        currentPassword,
        newPassword
      });

      console.log(response.data);

      setAlertVisible(true);

      const id = setTimeout(() => {
        setAlertVisible(false);
      }, 4000);
      setTimerId(id);

    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);

      if (error.response && error.response.status === 401) {
        setWrongPasswordAlertVisible(true);

        const id = setTimeout(() => {
          setWrongPasswordAlertVisible(false);
        }, 4000);

        setTimerId(id);
      } else {
        // Manejar otros tipos de error aquí
      }
    } finally {
      setChangingPassword(false);
    }
  };

  React.useEffect(() => {
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [timerId]);

  return (
    <div className="bg-[#F6F5F5] flex items-center justify-between z-400 ">
      <form class="flex items-center w-[500px] h-[20px] p-8 pl-4 ">
        <label for="simple-search" class="sr-only">Search</label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="simple-search" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-1 " placeholder="Buscar en Cloud Arch..." required />
        </div>
        <button type="submit" class="p-1.5 ml-2 text-sm font-medium text-white bg-[#4592AF] rounded-lg border border-[#4592AF] hover:bg-teal-500 ">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
      <div className="flex items-center gap-2 text-xl text-gray-500 z-400">
        {username ? (
          <p>{username}</p>
        ) : (
          <p>Cargando...</p>
        )}
        <div className="text-3xl pr-4">
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <FaUserCircle className="text-3xl " />
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown} className="text-gray-700">
                      <MenuItem onClick={() => setOpenModal(true)} className="flex gap-2">
                        <FaLock />
                        Cambiar contraseña
                      </MenuItem>

                      <MenuItem onClick={handleLogout} className="flex gap-2">
                        <FaPowerOff />Cerrar Sesión
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} className="flex" >
        {/* Contenido del Modal */}
        <form className="grid grid-cols-1 h-[200px] place-content-center gap-2 text-gray-600">
          <h1 className="text-xl font-bold">Cambiar contraseña</h1>
          <label>
            Contraseña actual:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border ml-2"
            />
          </label>
          <label>
            Nueva contraseña:
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border ml-2"
            />
          </label>
          <div className="flex justify-around">
            <button
              type="button"
              onClick={() => setOpenModal(false)}
              className="mt-2 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-400 focus:outline-none focus:ring focus:border-blue-300"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleChangePassword()}
              className="mt-2 bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-400 focus:outline-none focus:ring focus:border-blue-300"
            >
              Confirmar
            </button>
          </div>
          {isAlertVisible && (
            <Alert severity="success" onClose={() => setAlertVisible(false)}>
              Contraseña cambiada correctamente
            </Alert>
          )}
          {isWrongPasswordAlertVisible && (
            <Alert severity="error" onClose={() => setWrongPasswordAlertVisible(false)}>
              Contraseña actual incorrecta
            </Alert>
          )}
        </form>
      </Modal>
    </div>
  );
};

export default TopNavbar;
