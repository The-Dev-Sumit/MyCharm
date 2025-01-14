import React, {useState, useEffect} from 'react'
import NameAnimation from './NameAnimation';
import ShapeAnimation from './ShapeAnimation';

const LandingForMobile = () => {
  const [isLoading, setIsLoading] = useState(true);
        
           useEffect(() => {
                const load = setTimeout(() => {
                  setIsLoading(false);
                }, 2000)
            
                return () => clearTimeout(load)
           })
  
  return (
    <>
      {
      isLoading ? (
          <div className='w-full h-[340px] bg-gray-600 flex flex-col  gap-2 justify-center items-center animate-pulse '>
            <h1 className="bg-gray-500 h-7 rounded-md animate-pulse w-[20rem]"></h1>
            <p className="bg-gray-500 h-5 rounded-md animate-pulse w-[17rem] "></p>
            <p className="bg-gray-500 h-5 rounded-md animate-pulse w-[17rem] "></p>
            <p className="bg-gray-500 h-5 rounded-md animate-pulse w-[17rem] "></p>
      </div>
      ):(
      <div className='landPhone w-full h-[240px] bg-zinc-900 flex flex-col border-none p-5 text-[#FEF9D9] gap-2 justify-center items-center select-none'>
          <div className='h-[50px] z-20'>
               <NameAnimation/>
          </div>

          <h1 className="text-[1.3rem] font-bold uppercase">Welcome to my digital space</h1>
              <p className="text-center text-xs capitalize w-[80vw] border-none"> Here, creativity meets functionality. I’m excited to share my work with you. I’m a passionate developer who thrives on challenges and enjoys pushing boundaries. Excellence isn’t just a goal for me😁 it’s my driving force.</p>
              
              <div className=' z-20'>
               <ShapeAnimation/>
          </div>
    </div>
    )}
    </> 
  )
}

export default LandingForMobile;