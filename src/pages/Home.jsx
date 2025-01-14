import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Landing from '../components/Landing'
import MainBody from '../components/MainBody'
import Skills from '../components/Skills'
import { myWorkRef } from '../utils/myWorkRef';
import Footer from '../components/Footer'
import LandingForMobile from '../components/LandingForMobile'
import FooterForMobile from '../components/FooterForMobile'


const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 639px)");
      setIsMobile(mediaQuery.matches); // Set initial value
  
      const handleResize = () => setIsMobile(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleResize); // Listen for changes
  
      return () => mediaQuery.removeEventListener("change", handleResize); 
    }, []);

   useEffect(() => {
        const load = setTimeout(() => {
          setIsLoading(false);
        }, 3000)
    
        return () => clearTimeout(load)
   })
  
  return (
      <div className='w-full overflow-x-hidden'>
          <div className='fixed w-full z-50 top-0'>
             <Navbar/> 
          </div>
          
          <div className='w-full land mt-12'>
             {isMobile ? <LandingForMobile/> : <Landing/>} 
          </div>

          <div className='w-full '>
              <MainBody/>
          </div>
          

          <div ref={myWorkRef} className='myWork7 w-full select-none px-2 py-6 overflow-x-hidden bg-sky-200'>
        <div className='flex justify-center'>
          { isLoading ? (
            <h1 className='w-[10%] h-[28px] top-[47.4rem] absolute animate-pulse bg-gray-400'></h1>
          ): (
              <h1 className='myWork8 select-none text-[1.3rem] font-bold'>MY WORKS</h1>
          )}
              </div>
              <Skills/>
      </div>
      
      <div className='w-full h-[300px]'>
        {isMobile ? <FooterForMobile/> : <Footer/>}
      </div>
    </div>
  )
}

export default Home