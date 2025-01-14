import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../components/Navbar'
import Github from '../assets/images/github.png'
import Linkedin from '../assets/images/linkedin.png'

const ContactMe = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", import.meta.env.VITE_FORM_ACCESS_KEY);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch(import.meta.env.VITE_FORM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setSuccessMessage("Your message has been sent successfully!"); 
      event.target.reset();
    } else {
      console.error("Error", res);
      setSuccessMessage("Something went wrong. Please try again."); 
    }
  };

setTimeout(() => {
      setSuccessMessage('');
}, 3000);
  
  useEffect(() => {
              const load = setTimeout(() => {
                setIsLoading(false);
              }, 2000)
          
              return () => clearTimeout(load)
         })

return (
  <div>
    <div>
      <Navbar />
    </div>
    {
      isLoading ? (
          <div className='flex flex-col  bg-gray-800 w-full min-h-screen items-center py-20 px-5 animate-pulse'>
  <div className='h-12 conlod bg-gray-500 rounded w-[20vw]'></div>
  <div className='flex flex-row  con justify-center items-center mt-28'>
    <div className='flex flex-col p-4 space-y-4'>
      <div className='h-8 conlod1 bg-gray-500 rounded w-[15vw]'></div>
      <div className="h-12 conlod2 bg-gray-500 rounded-full w-12">
      </div>
      <div className="h-12 conlod2 bg-gray-500 rounded-full w-12"></div>
      <div className='h-10 conlod3 bg-gray-500 rounded w-[7vw] ml-16'></div>
    </div>
    <div className='w-[25vw] wForm p-8 flex flex-col'>
      <div className='flex flex-col items-center'>
        <div className='h-8 bg-gray-500 rounded w-full '></div>
        <div className='h-8 bg-gray-500 rounded w-full my-4'></div>
        <div className='h-24 bg-gray-500 rounded w-full'></div>
        <div className='h-10 bg-gray-500 rounded w-[7vw] mt-2'></div>
      </div>
    </div>
  </div>
</div>
      ): (
          <div className='flex flex-col mCon bg-gray-800 w-full min-h-screen items-center py-20 px-5 sm:px-2'>
      <h1 className='capitalize conText text-4xl text-slate-200 font-bold '>get in touch</h1>
      <div className='flex flex-row  con justify-center items-center mt-28'>
        <div className='flex flex-col p-4 space-y-5'>
          <p className='ml-4'>
            <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#04be32", }} />
            <span className='ml-2 tracking-normal text-blue-300'>sumit73564@gmail.com</span>
          </p>
          <div className="flex items-center">
            <div className="relative group">
              <div className="bg-gray-800 text-white p-3 rounded-full transition-all duration-300">
                <a href='https://github.com/The-Dev-Sumit'
                target="_blank"
                rel="noopener noreferrer"
                >
                  <img
                  className="w-9 h-9 cursor-pointer"
                  src={Github}
                  alt="GitHub icon"
                />
                </a>
              </div>
              <span className="absolute gText left-full  top-1/2 group-hover:opacity-100 -translate-y-1/2 bg-gray-800 text-white px-2 py-2 rounded-lg opacity-0 scale-0  group-hover:scale-100 transition-all duration-300">
                Github
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="relative group">
              <div className="bg-gray-800 text-white p-3 rounded-full transition-all duration-300">
                <a
                href='https://www.linkedin.com/in/sumit-sonar-097738281/'
                target="_blank"
                rel="noopener noreferrer"
                >
                  <img
                  className="w-9 h-9 cursor-pointer"
                  src={Linkedin}
                  alt="LinkedIn icon"
                />
                </a>
              </div>
              <span className="absolute gText left-full top-1/2 -translate-y-1/2 bg-gray-800 text-white px-2 py-2 rounded-lg opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                LinkedIn
              </span>
            </div>
          </div>
          <button className='bg-gray-800 down hover:bg-gray-700 font-bold transition-all duration-200 capitalize transform active:scale-95 text-white py-3 px-1 rounded-md'>
            <a
            href='/Resume of Sumit.pdf'
            download="SumitSonarCV.pdf"
            >
              download CV
          </a>
          </button>
        </div>
        <div className='w-[25vw] wForm p-8 flex flex-col'>
          <form onSubmit={onSubmit} className='flex flex-col items-center '>
            <div className='w-full h-2 '>
              <input
                type='text'
                name='name'
                placeholder='Name'
                required
                className='w-full p-2 border-none caret-slate-300 text-green-400 font-semibold tracking-wide focus:outline-lime-700  rounded-md bg-slate-700'
              />
            </div>
            <div className='w-full h-2 mt-10'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                required
                className='w-full p-2 border-none caret-slate-300 text-green-400 font-semibold tracking-wide  focus:outline-lime-700  rounded-md bg-slate-700'
              />
            </div>
            <div className='w-full mt-10'>
              <textarea
                name='message'
                placeholder='Message'
                required
                className='w-full p-2 shadow-md caret-slate-300 text-green-400 font-semibold tracking-wide  focus:outline-lime-700 border-none rounded-md h-[110px] bg-slate-700'
              />
            </div>
            <div>
              <button type='submit' className='bg-gray-800 down font-bold transition-all duration-200 capitalize transform active:scale-95 text-white mt-2 py-2 px-4 w-32 gap-3  rounded-md'><FontAwesomeIcon icon={faPaperPlane} style={{ color: "#04be32", }} /><span className='ml-2'>send</span> </button>
            </div>
          </form>
        </div>
        {successMessage && (
          <div className="top-[22%] text-center absolute flex justify-center items-center text-lime-500 font-medium">{successMessage}</div>
        )}
      </div>
    </div>
      )}
    
  </div>
)
}

export default ContactMe;