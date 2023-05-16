import { Dialog } from '@headlessui/react';
import { useRef, useState } from 'react';

import Sidebar from '../shared/sidebar';
import Overview from '../shared/overview';


function Index() {
  return (
    <>
      <div className='flex w-screen h-screen  bg-[#f5f4f7]'>
        <div className='hidden md:block'> 
          <Sidebar />
        </div>
        <Overview />
      </div>

    </>
  );
}

export default Index;
