import React, { useState, useEffect } from 'react';
import BladeAnimation from './BladeAnimation';
import MainBodyAnimation from './MainBodyAnimation';

const MainBody = () => {
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
    }, 2000)

    return () => clearTimeout(load)
  })
  
  return (
  <>
    { isLoading ? (
      <div className='w-full h-[300px] animate-pulse bg-gray-500'></div>
    ) : (
          <div className='w-full h-[300px] overflow-hidden'>
            {isMobile ? <MainBodyAnimation/> : <BladeAnimation/>}
    </div>
    )}
     </> 
  )
}

export default MainBody;