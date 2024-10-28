
import React, { } from 'react';

import Navbar from '../components/Navbar';
import FileList from '../components/FileList';
import TopNavbar from '../components/TopNavbar';
import DirectoryList from '../components/DirectoryList';
function ViewEmpleado() {


  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-[white] flex flex-col-reverse'>
        <DirectoryList />
        <FileList />
        <TopNavbar />
      </div>
      <div className='w-[15%] bg-[#F6F5F5]'>
        <Navbar />
      </div>
    </div>
  );
}

export default ViewEmpleado;
