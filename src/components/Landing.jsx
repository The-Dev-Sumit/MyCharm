import React, { useEffect, useRef, useState } from "react";
import RippleEffect from "./RippleEffect";
import WaterEffect from '../utils/useRippleEffect';



const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  

    const rippleRef = useRef(null);

  WaterEffect(rippleRef);
  
  useEffect(() => {
    const load = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    
    return () => clearTimeout(load)
  },[])
    
  return (
      <div>
      <div className="mt-10 land overflow-hidden">
        {isLoading ? (
          <div className="animate-pulse w-full h-[400px] bg-gray-400"></div>
        ) : (
            <RippleEffect/>
        )}   
      </div>
      {isLoading ? (
        <>
            <h1 className="h-14 absolute left-[20%] top-[24%] w-[55%] bg-gray-500 animate-pulse mb-4 rounded-md"></h1>
            <h1 className="h-6 absolute left-[23%] top-[35%] w-[49%] bg-gray-500 animate-pulse mb-2 rounded-md"></h1>
          <h1 className="h-6 absolute left-[23%] top-[39%] w-[49%] bg-gray-500 animate-pulse mb-2 rounded-md"></h1>
          <h1 className="h-6 absolute left-[44%] top-[43%] w-[5%] bg-gray-500 animate-pulse mb-2 rounded-md"></h1>
          </>
      ) : (
        <>
        <div ref={rippleRef} className="absolute gap-2 flex flex-col left-[18vw] top-[11rem] border-none md:px-6 px-8 text-[#FEF9D9] text-opacity-40 select-none">
              <h1  className="text-[3.5vw] font-bold uppercase">Welcome to my digital space</h1>
              <p className=" text-center capitalize w-[50vw] border-none ml-[2.5vw]">Here, creativity meets functionality. I’m excited to share my work with you. I’m a passionate developer who thrives on challenges and enjoys pushing boundaries. Excellence isn’t just a goal for me😁 it’s my driving force.</p>
         </div>
      </>
      )} 
      </div>
  )
}

export default Landing;