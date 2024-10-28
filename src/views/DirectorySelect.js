import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import FileList from '../components/FileList';
import TopNavbar from '../components/TopNavbar';
import DirectoryList from '../components/DirectoryList';
import {FaFolderOpen} from 'react-icons/fa';

const DirectorySelect = () => {
  const { directoryId, directoryName } = useParams();
  console.log('ID:', directoryId);
  console.log('Nombre:', decodeURIComponent(directoryName));

  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden ">
      <div className='w-[85%] '>
        {/*<p>ID: {directoryId}</p>*/}
        <TopNavbar />
        <div className="bg-[#F6F5F5] font-semibold text-sm pl-4 flex items-center gap-2 text-gray-500">
          <p>Directorio</p>
          <FaFolderOpen/>
          <p> {decodeURIComponent(directoryName)}</p>
        </div>
        <FileList />
        <DirectoryList />
      </div>
      <div className='w-[15%] bg-[#F6F5F5] '>
        <Navbar />
      </div>
    </div>
  );
};

export default DirectorySelect;