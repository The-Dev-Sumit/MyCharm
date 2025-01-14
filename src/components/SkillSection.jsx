import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

const SkillSection = ({ title, videoSrc, description, appSrc, imgSrc, dateOfMade }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
      useEffect(() => {
        const load = setTimeout(() => {
          setIsLoading(false);
        }, 2000)
    
        return () => clearTimeout(load)
      })

    
    return (
    <>
        { isLoading ? (
                <div className='w-full relative mt-0 h-[70px] animate-pulse bg-gray-500 rounded-md'>
                <div className=' absolute w-[70%] h-[20px] left-[15%] top-[25%] animate-pulse bg-gray-600 rounded-md'></div>
            </div>
        ) : (
            <div className="myWork p-3 w-full flex justify-center flex-col transition-all duration-300 border-none rounded-lg overflow-hidden ">
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center  cursor-pointer sm:gap-[2vw]">
              <button className='myWork1 ml-[10vw]'>
                  <FontAwesomeIcon
                      onClick={() => setIsOpen(!isOpen)}
                      icon={faChevronRight}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                  />
              </button>
              <h1
                className='myWork2 text-md text-black ml-[30vw] font-bold'>
                  {title}
              </h1>
              <p className='myWork3 text-lg text-black ml-[25vw]'>{dateOfMade}</p>
          </div>
          {isOpen && (
              <div className="myWork4 mt-4 bg-sky-200 items-center p-4 gap-[13vw] flex justify-center">
                  {videoSrc && (
                      <video
                          src={videoSrc}
                          controls
                          className="myWork5 w-[20vw] h-[25vh] object-cover rounded-lg "
                      />
                  )}

                  <p className="myWork6 text-black text-center w-[500px]">{description}</p>

                  {appSrc && (
                      <a
                          href={appSrc}
                          download
                          className="text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded"
                      >
                          Download <FontAwesomeIcon icon={faFloppyDisk} />
                      </a>
                  )}

                  {imgSrc && (
                      <img
                          src={imgSrc}
                          alt={title}
                          className="w-32 h-16 object-cover rounded-lg mt-4"
                      />
                  )}
              </div>
          )}
      </div>
        )}
      </>
  );
}

export default SkillSection;