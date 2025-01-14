import React, { useRef, useEffect, useState } from 'react'
import { myWorkRef } from '../utils/myWorkRef';

const Navbar = () => {
    const [isLoading, setIsLoading] = useState(true);
    
       useEffect(() => {
            const load = setTimeout(() => {
              setIsLoading(false);
            }, 2000)
        
            return () => clearTimeout(load)
       })

     const scrollToMyWorks = () => {
    if (myWorkRef.current) {
      myWorkRef.current.scrollIntoView({ behavior: "smooth" });
    }
    };
    
  return (
  <>
    { isLoading?(
        <div className='w-full h-[57px] absolute top-0 animate-pulse bg-gray-400'>
          <h1 className='w-[5%] navLod h-[17px] rounded-sm absolute top-5 left-[64%] animate-pulse bg-gray-500'></h1>
          <h1 className='w-[5%] navLod1 h-[17px] rounded-sm absolute top-5 left-[72%] animate-pulse bg-gray-500'></h1>
          <h1 className='w-[5%] navLod2 h-[17px] rounded-sm absolute top-5 left-[81%] animate-pulse bg-gray-500'></h1>
          <h1 className='w-[5%] navLod3 h-[17px] rounded-sm absolute top-5 left-[91%] animate-pulse bg-gray-500'></h1>
      </div>
      ) : (
         <div className='flex nave absolute bg-black flex-row p-4 w-full text-white overflow-x-hidden'>
          <div className='flex items-center w-full justify-end'>
            <ul className='nav flex flex-row gap-[5vw]'>
              <li>
                  <a href="/">Home</a>
              </li>
              <li>
                  <a href="/" className='cursor-pointer' onClick={scrollToMyWorks}>My Work</a>
              </li>
              <li>
                  <a href="/about me">About Me</a>
              </li>
              <li>
                  <a href="/contact me">Contact Me</a>
              </li>
          </ul>
          </div>
    </div> 
    )}
      </>
  )
}

export default Navbar