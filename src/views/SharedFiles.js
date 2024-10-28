
import React, { } from 'react';
import Navbar from '../components/Navbar';
import TopNavbar from '../components/TopNavbar';
import FileShareList from '../components/FileShareList';

function SharedFiles() {


  return (
    <div className="h-screen w-screen flex flex-row-reverse overflow-x-hidden">
      <div className='w-[85%] bg-[white] flex flex-col-reverse'>
        <div className='w-full h-full'>

        <TopNavbar />
        <FileShareList />
      </div>
      </div>
      <div className='w-[15%] bg-[#F6F5F5]'>
        <Navbar />
      </div>
    </div>
  );
}

export default SharedFiles;
