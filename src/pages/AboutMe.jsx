import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCss3, faHtml5, faReact } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../components/Navbar'
import Js from '../assets/images/icon-javascript.png'
import gsap from '../assets/images/gsap.png'
import java from '../assets/images/java.png'
import python from '../assets/images/python.png'
import tailwind from '../assets/images/tailwind-css.png'
import node from '../assets/images/node-js.png'
import cSharp from '../assets/images/c-sharp.png'

const AboutMe = () => {
  const [isLoading, setIsLoading] = useState(true);
      
         useEffect(() => {
              const load = setTimeout(() => {
                setIsLoading(false);
              }, 2000)
          
              return () => clearTimeout(load)
         })
  
  return (
    <div>
      <div className='fixed w-full top-0 left-0'>
        <Navbar/>
      </div>
      {isLoading ? (
        <>
        <div className="pt-[70px] p-5">
  <div className="h-6 bg-gray-300 animate-pulse w-32 mb-4 ml-10"></div>
  <div className="h-1 w-full bg-gray-300 animate-pulse mt-5"></div>
</div>
<div className="about2 w-full bg-slate-200 min-h-screen mt-0 py-7 lg:px-28 flex flex-col gap-7">
  {/* Who Am I Section */}
  <div className="sm:flex sm:gap-6 lg:flex justify-between lg:flex-row sm:flex-col">
    <div className="h-6 bg-gray-300 animate-pulse w-24"></div>
    <div className="flex flex-col gap-4">
      <div className="h-4 bg-gray-300 animate-pulse w-[90%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[85%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[95%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[80%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[75%]"></div>
    </div>
  </div>
  <div className="h-1 w-[45vw] bg-gray-300 animate-pulse ml-[46%] shadow-lg"></div>

  {/* Skills Section */}
  <div className="sm:flex sm:gap-6 lg:flex justify-between lg:flex-row sm:flex-col">
    <div className="h-6 bg-gray-300 animate-pulse w-24"></div>
    <div className="flex flex-wrap gap-4">
      <div className="h-6 w-20 bg-gray-300 animate-pulse"></div>
      <div className="h-6 w-16 bg-gray-300 animate-pulse"></div>
      <div className="h-6 w-24 bg-gray-300 animate-pulse"></div>
      <div className="h-6 w-16 bg-gray-300 animate-pulse"></div>
    </div>
  </div>
  <div className="h-1 w-[45vw] bg-gray-300 animate-pulse ml-[46%] shadow-lg"></div>

  {/* My Strength Section */}
  <div className="sm:flex sm:gap-6 lg:flex justify-between lg:flex-row sm:flex-col">
    <div className="h-6 bg-gray-300 animate-pulse w-32"></div>
    <div className="flex flex-col gap-4">
      <div className="h-4 bg-gray-300 animate-pulse w-[90%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[85%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[95%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[80%]"></div>
      <div className="h-4 bg-gray-300 animate-pulse w-[75%]"></div>
    </div>
  </div>
  <div className="h-1 w-[45vw] bg-gray-300 animate-pulse ml-[46%] shadow-lg"></div>
          </div>
          </>
      ) : (
          <>
        <div className='pt-[70px] p-5'>
        <h2 className='about1 text-2xl font-Roboto font-bold mt-10 ml-10'>About Me</h2>
        <div className='h-1 w-full bg-gray-800 mt-5'></div>
      </div>
      <div className='about2 w-full bg-slate-300 min-h-screen mt-0 py-7  lg:px-28 flex flex-col gap-7'>
        <div className='about2 sm:flex sm:gap-6 lg:flex justify-between capitalize lg:flex-row sm:flex-col'>
          <h3 className='text-xl font-bold'>Who Am I?</h3>
          <p className='about3 font-semibold w-[45vw]'>I am Sumit Sonar, Currently I am studying BCA in Manipal University Jaipur. <br /> <br />
            and i am an admin of my college group, i have tried to teach also whatever i can - College studies and coding to my friends only. <br />
            <br />
            I am passionate about learning new things and I am always eager to take on new challenges. I am a quick learner and I am always looking for ways to improve my skills. <br />
            <br />
            I wanted to make games, and i am very much interested in it. but Currently i am building websites and  applications along with learning game development. <br />
            <br />
            While I strive to be serious, I naturally have a light-hearted and playful personality. I enjoy my work and bring energy to it, though I ensure that my results are always professional and meet high standards. <br /> 
            <br />
            I tend to be overly straightforward, which can sometimes come across as blunt. <br /> 
            <br />
            I value honesty deeply and never lie, which might not always align with others' expectations.
            <br /> 
            <br />
              i made less projects but all projects are experiments and not clones, i haven't made any clones from the start of my learning.
          </p>
        </div>
        <hr className='hr h-[2px] w-[45vw] bg-gray-800 ml-[46%] bg-opacity-40 shadow-lg' />
        <div className='about2 sm:flex sm:gap-6 lg:flex justify-between capitalize lg:flex-row sm:flex-col whitespace-pre-line'>
          <h3 className='text-xl font-bold '>skills: </h3>
          <p className='about3 font-semibold w-[45vw]'>
            <div className='flex aboute3 flex-wrap items-center'>
              basics:&nbsp;&nbsp;<span className="ml-1 flex"><img src={gsap} alt='gsap icon' style={{ width: "1.3rem" }} />&nbsp;gsap,</span>&nbsp;
              <span className="ml-1 flex"><img src={java} alt='java icon' style={{ width: "1.3rem" }} />&nbsp;java,</span>&nbsp;
              <span className="ml-1 flex"><img src={python} alt='python icon' style={{ width: "1.3rem" }} />&nbsp;python,</span>&nbsp; <span className="ml-1 flex"><img src={cSharp} alt='c-sharp icon' style={{ width: "1.5rem" }} />&nbsp;c Sharp,</span>
            </div>
            <div className='flex aboute2 flex-wrap items-center mt-4'>
              intermediate:&nbsp;<FontAwesomeIcon icon={faHtml5} style={{ color: "#d00606", }} />&nbsp;Html, <span className="ml-2"><FontAwesomeIcon icon={faCss3} style={{ color: "#166bac", }} /> css,</span> <span className="ml-2 flex"><img src={Js} alt='javascript icon' style={{ width: "1.3rem" }} />&nbsp;javascript,</span>&nbsp;&nbsp;<FontAwesomeIcon icon={faReact} style={{ color: "#053b99", }} />&nbsp;react,
              &nbsp;<span className="ml-1 flex"><img src={tailwind} alt='tailwind icon' style={{ width: "1.3rem" }} />&nbsp;tailwind css,</span>           
              &nbsp;<span className="ml-1 flex"><img src={node} alt='nodejs icon' style={{ width: "1.3rem" }} />&nbsp;node.js</span>                    
            </div>
          </p>
        </div>
        <hr className='hr h-[2px] w-[45vw] bg-gray-800 ml-[46%] bg-opacity-40 shadow-lg'/>
        <div className='about2 sm:flex sm:gap-6 lg:flex justify-between capitalize lg:flex-row sm:flex-col bg-slate-300'>
          <h3 className='text-xl font-bold '>my strength</h3>
          <p className='about3 font-semibold w-[45vw]'>
            I am a fast learner who quickly adapts to new concepts and challenges. <br />
            <br />
            I am dedicated and consistent, staying focused on my work until it is completed with excellence. <br />
            <br />
            I have a curiosity-driven mindset and enjoy exploring and learning new things. <br />
            <br />
            I am a problem-solver who can find innovative solutions to complex problems. <br />
            <br />
            I am reliable and committed, I never go back on my words and promises. <br />
            <br />
            I prioritize gaining in-depth knowledge in all areas of learning, enabling me to approach tasks and challenges with expertise and confidence.
          </p>
        </div>
        <hr className='hr h-[2px] w-[45vw] bg-gray-800 ml-[46%] bg-opacity-40 shadow-lg'/>
            </div>
            </>
      )}
    </div>
  )
}

export default AboutMe;