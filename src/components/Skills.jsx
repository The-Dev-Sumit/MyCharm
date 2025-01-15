import React from 'react'
import SkillSection from './SkillSection';
const FirstProject = "https://www.youtube.com/embed/epoW9eXuYbk?si=II_78piedc24QLZQ";
const SecondProject = "https://www.youtube.com/embed/iwlj7uSlyOk?si=KvwoPD98MOSxS77m";
const ThirdProject = "https://www.youtube.com/embed/E6YPc_Jb1qs?si=U3FVhXju0UAexXRg";



const skillsData = [
    {
        title: "My First Frontend Website",
        videoSrc: FirstProject,
        description: "This is my first frontend website, it is build in html and css and little bit of javascript. This is my first ever project to learn things, from here my journey started.",
        appSrc: null,
        imgSrc: null,
        dateOfMade: "Date: 12-10-2023",
    },
    {
        title: "My Second Fullstack Website",
        videoSrc: SecondProject,
        description: "This is my second fullstack website, using html, css and javascript with database and backend, this project i made before our exams, a basic test portal type project, which my friends used. I know it is childish but I fun with whatever i do.",
        appSrc: null,
        imgSrc: null,
        dateOfMade: "Date: 28-01-2024",
    },
    {
        title: "My Third Project: Snake Game",
        videoSrc: ThirdProject,
        description: "This is my third project and first game using java language for the first time, this is a basic Snake Game, i wanted to try something new",
        appSrc: null,
        imgSrc: null,
        dateOfMade: "Date: 03-02-2024",
    },
]; 


const Skills = () => {
  return (
      <div className='p-3 overflow-x-hidden'>
          <div className="space-y-2">
        {skillsData.map((skill, index) => (
          <SkillSection
            key={index}
            title={skill.title}
            videoSrc={skill.videoSrc}
            description={skill.description}
            appSrc={skill.appSrc}
            imgSrc={skill.imgSrc}
            dateOfMade={skill.dateOfMade}
          />
        ))}
      </div>
    </div>
  )
}

export default Skills