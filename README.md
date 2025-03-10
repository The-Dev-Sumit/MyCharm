# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


<script>
      // Disable right-click
      document.addEventListener("contextmenu", (e) => e.preventDefault());

      // Disable certain key combinations
      document.addEventListener("keydown", (e) => {
        // Prevent F12
        if (e.key === "F12") {
          e.preventDefault();
        }
        // Prevent Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.key === "I") {
          e.preventDefault();
        }
        // Prevent Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.key === "C") {
          e.preventDefault();
        }
        // Prevent Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.key === "J") {
          e.preventDefault();
        }
        // Prevent Ctrl+U (View Source)
        if (e.ctrlKey && e.key === "U") {
          e.preventDefault();
        }
      });
    </script>

// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 300) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const skillsChart = echarts.init(document.getElementById('skillsChart'));
    const option = {
      animation: false,
      radar: {
        indicator: [
          { name: 'Frontend', max: 100 },
          { name: 'Backend', max: 100 },
          { name: 'UI/UX', max: 100 },
          { name: 'DevOps', max: 100 },
          { name: 'Project Management', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: [{
          value: [95, 80, 90, 75, 85],
          name: 'Skills',
          areaStyle: {
            color: 'rgba(99, 102, 241, 0.2)'
          },
          lineStyle: {
            color: 'rgb(99, 102, 241)'
          }
        }]
      }]
    };
    skillsChart.setOption(option);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-8">
              {['intro', 'interests', 'education', 'experience'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`cursor-pointer whitespace-nowrap px-3 py-2 text-sm font-medium capitalize ${
                    activeSection === section
                      ? `text-indigo-600 border-b-2 border-indigo-600 ${darkMode ? 'text-indigo-400' : ''}`
                      : `${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-20">
        {/* Profile Section */}
        <section id="intro" className="py-20">
          <div className="flex items-center justify-between">
            <div className="w-1/2 pr-12">
              <img
                src="https://public.readdy.ai/ai/img_res/08b66ad590d649887d68d1ffa707d785.jpg"
                alt="Profile"
                className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
              />
              <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-8 text-center transition-colors duration-300`}>Alexander Mitchell</h1>
              <p className={`text-xl ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mt-2 text-center transition-colors duration-300`}>Senior Software Engineer</p>
              <button
                onClick={toggleDarkMode}
                className={`mt-4 px-4 py-2 rounded-full !rounded-button transition-colors duration-300 flex items-center justify-center ${
                  darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} mr-2`}></i>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
            <div className="w-1/2">
              <div className="prose prose-lg">
                <p className={`leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  With over 8 years of experience in software development, I specialize in building scalable web applications and leading high-performance development teams. My passion lies in creating elegant solutions to complex problems while mentoring the next generation of developers.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Currently based in San Francisco, I've had the privilege of working with innovative startups and established tech giants, contributing to projects that have impacted millions of users worldwide.
                </p>
              </div>
              <div className="mt-8" id="skillsChart" style={{ width: '100%', height: '300px' }}></div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="skills" className={`py-20 rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Skills</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-laptop-code',
                title: 'Open Source Development',
                description: 'Contributing to community projects and maintaining several popular npm packages'
              },
              {
                icon: 'fa-mountain',
                title: 'Mountain Climbing',
                description: 'Conquered 12 peaks above 14,000 feet in the past two years'
              },
              {
                icon: 'fa-camera',
                title: 'Photography',
                description: 'Specializing in landscape and architectural photography'
              },
              {
                icon: 'fa-book',
                title: 'Technical Writing',
                description: 'Published author of "Modern Web Architecture" and regular blog contributor'
              },
              {
                icon: 'fa-robot',
                title: 'AI & Machine Learning',
                description: 'Exploring applications of AI in software development'
              },
              {
                icon: 'fa-chess',
                title: 'Strategic Gaming',
                description: 'Rated 2100+ in chess and active in local tournaments'
              }
            ].map((interest, index) => (
              <div key={index} className={`rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <i className={`fas ${interest.icon} text-4xl text-indigo-600 mb-4`}></i>
                <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{interest.title}</h3>
                <p className={`transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{interest.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20">
          <h2 className={`text-3xl font-bold mb-12 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Educational Background</h2>
          <div className="space-y-12">
            {[
              {
                institution: 'Stanford University',
                degree: 'Master of Science in Computer Science',
                years: '2015 - 2017',
                achievements: 'Specialized in Artificial Intelligence and Machine Learning. Graduate Research Assistant in the Natural Language Processing Lab.'
              },
              {
                institution: 'University of California, Berkeley',
                degree: 'Bachelor of Science in Computer Science',
                years: '2011 - 2015',
                achievements: 'Graduated with Honors. President of the Computer Science Society. Dean\'s List all semesters.'
              }
            ].map((edu, index) => (
              <div key={index} className={`rounded-lg shadow-sm p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="flex items-start">
                  <div className="flex-grow">
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{edu.institution}</h3>
                    <p className={`font-medium mt-1 transition-colors duration-300 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{edu.degree}</p>
                    <p className={`mt-1 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{edu.years}</p>
                    <p className={`mt-4 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.achievements}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <h2 className={`text-3xl font-bold mb-12 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Professional Experience</h2>
          <div className="space-y-12">
            {[
              {
                company: 'Google',
                position: 'Senior Software Engineer',
                period: '2020 - Present',
                responsibilities: [
                  'Lead a team of 8 engineers developing cloud-native applications',
                  'Architected and implemented microservices handling 1M+ requests per day',
                  'Reduced system latency by 40% through optimization and caching strategies'
                ]
              },
              {
                company: 'Microsoft',
                position: 'Software Engineer',
                period: '2017 - 2020',
                responsibilities: [
                  'Developed features for Azure Cloud Services used by Fortune 500 companies',
                  'Implemented CI/CD pipelines reducing deployment time by 60%',
                  'Mentored junior developers and led technical training sessions'
                ]
              }
            ].map((exp, index) => (
              <div key={index} className={`rounded-lg shadow-sm p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
                <p className="text-indigo-600 font-medium mt-1">{exp.position}</p>
                <p className="text-gray-500 mt-1">{exp.period}</p>
                <ul className="mt-4 space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className={`flex items-start transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <i className="fas fa-check-circle text-indigo-600 mt-1 mr-2"></i>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer !rounded-button"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default App;


// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
const swiperStyles = `
.skill-swiper {
padding: 20px 10px 50px !important;
}
.skill-swiper .swiper-pagination-bullet {
width: 10px;
height: 10px;
background: #6366f1;
opacity: 0.5;
}
.skill-swiper .swiper-pagination-bullet-active {
opacity: 1;
}
`;
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = swiperStyles;
document.head.appendChild(styleSheet);
const App: React.FC = () => {
const [activeSection, setActiveSection] = useState('intro');
const sections = ['intro', 'skills', 'interests', 'education', 'experience'];
const [showBackToTop, setShowBackToTop] = useState(false);
const [darkMode, setDarkMode] = useState(false);
const toggleDarkMode = () => {
setDarkMode(!darkMode);
};
useEffect(() => {
const handleScroll = () => {
setShowBackToTop(window.scrollY > 300);
const sections = document.querySelectorAll('section');
sections.forEach(section => {
const rect = section.getBoundingClientRect();
if (rect.top >= 0 && rect.top <= 300) {
setActiveSection(section.id);
}
});
};
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);
const scrollToSection = (sectionId: string) => {
const section = document.getElementById(sectionId);
section?.scrollIntoView({ behavior: 'smooth' });
};
useEffect(() => {
const skillsChart = echarts.init(document.getElementById('skillsChart'));
const option = {
animation: false,
radar: {
indicator: [
{ name: 'Frontend', max: 100 },
{ name: 'Backend', max: 100 },
{ name: 'UI/UX', max: 100 },
{ name: 'DevOps', max: 100 },
{ name: 'Project Management', max: 100 }
]
},
series: [{
type: 'radar',
data: [{
value: [95, 80, 90, 75, 85],
name: 'Skills',
areaStyle: {
color: 'rgba(99, 102, 241, 0.2)'
},
lineStyle: {
color: 'rgb(99, 102, 241)'
}
}]
}]
};
skillsChart.setOption(option);
}, []);
return (
<div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
{/* Navigation */}
<nav className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md z-50 transition-colors duration-300`}>
<div className="max-w-7xl mx-auto px-4">
<div className="flex justify-between items-center h-16">
<div className="flex space-x-8">
{sections.map((section) => (
<button
key={section}
onClick={() => scrollToSection(section)}
className={`cursor-pointer whitespace-nowrap px-3 py-2 text-sm font-medium capitalize ${
activeSection === section
? `text-indigo-600 border-b-2 border-indigo-600 ${darkMode ? 'text-indigo-400' : ''}`
: `${darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`
}`}
>
{section}
</button>
))}
</div>
</div>
</div>
</nav>
<div className="max-w-7xl mx-auto px-4 pt-20">
{/* Profile Section */}
<section id="intro" className="py-20">
<div className="flex items-center justify-between">
<div className="w-1/2 pr-12">
<img
src="https://public.readdy.ai/ai/img_res/08b66ad590d649887d68d1ffa707d785.jpg"
alt="Profile"
className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
/>
<h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mt-8 text-center transition-colors duration-300`}>Alexander Mitchell</h1>
<p className={`text-xl ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mt-2 text-center transition-colors duration-300`}>Senior Software Engineer</p>
<button
onClick={toggleDarkMode}
className={`mt-4 px-4 py-2 rounded-full !rounded-button transition-colors duration-300 flex items-center justify-center ${
darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'
}`}
>
<i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} mr-2`}></i>
{darkMode ? 'Light Mode' : 'Dark Mode'}
</button>
</div>
<div className="w-1/2">
<div className="prose prose-lg">
<p className={`leading-relaxed transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
With over 8 years of experience in software development, I specialize in building scalable web applications and leading high-performance development teams. My passion lies in creating elegant solutions to complex problems while mentoring the next generation of developers.
</p>
<p className="text-gray-700 leading-relaxed mt-4">
Currently based in San Francisco, I've had the privilege of working with innovative startups and established tech giants, contributing to projects that have impacted millions of users worldwide.
</p>
</div>
<div className="mt-8" id="skillsChart" style={{ width: '100%', height: '300px' }}></div>
</div>
</div>
</section>
{/* Skills Section */}
<section id="skills" className={`py-20 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<h2 className={`text-3xl font-bold mb-12 text-center transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Technical Skills</h2>
<div className="max-w-6xl mx-auto">
<Swiper
modules={[Pagination, Autoplay]}
spaceBetween={30}
slidesPerView={3}
pagination={{ clickable: true }}
autoplay={{ delay: 3000 }}
className="skill-swiper"
>
{[
{
category: 'Frontend Development',
icon: 'fa-code',
color: 'from-blue-400 to-blue-600',
skills: [
{ name: 'HTML5', level: 95 },
{ name: 'CSS3', level: 92 },
{ name: 'JavaScript', level: 90 },
{ name: 'React', level: 88 },
{ name: 'GSAP', level: 85 }
]
},
{
category: 'Backend Development',
icon: 'fa-server',
color: 'from-green-400 to-green-600',
skills: [
{ name: 'Java', level: 88 },
{ name: 'Python', level: 85 },
{ name: 'C#', level: 82 },
{ name: 'Node.js', level: 90 }
]
},
{
category: 'DevOps & Tools',
icon: 'fa-tools',
color: 'from-purple-400 to-purple-600',
skills: [
{ name: 'Docker', level: 88 },
{ name: 'Kubernetes', level: 82 },
{ name: 'AWS', level: 85 },
{ name: 'CI/CD', level: 90 }
]
},
{
category: 'Other Skills',
icon: 'fa-lightbulb',
color: 'from-yellow-400 to-yellow-600',
skills: [
{ name: 'System Design', level: 90 },
{ name: 'Agile/Scrum', level: 95 },
{ name: 'TDD', level: 88 },
{ name: 'Performance Optimization', level: 92 }
]
}
].map((category, index) => (
<SwiperSlide key={index}>
<div className={`h-full p-8 rounded-xl transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-lg`}>
<div className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
<i className={`fas ${category.icon} text-2xl text-white`}></i>
</div>
<h3 className={`text-xl font-semibold mb-6 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
{category.category}
</h3>
<div className="space-y-6">
{category.skills.map((skill, skillIndex) => (
<div key={skillIndex} className="relative">
<div className="flex justify-between mb-2">
<span className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
{skill.name}
</span>
<span className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
{skill.level}%
</span>
</div>
<div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-100'} overflow-hidden`}>
<div
className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-500 ease-out`}
style={{
width: `${skill.level}%`,
boxShadow: `0 0 10px rgba(${darkMode ? '255,255,255,0.2' : '0,0,0,0.1'})`
}}
></div>
</div>
</div>
))}
</div>
</div>
</SwiperSlide>
))}
</Swiper>
</div>
</section>
{/* Interests Section */}
<section id="interests" className={`py-20 rounded-lg shadow-sm transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<h2 className="text-3xl font-bold text-gray-900 mb-12">Personal Interests</h2>
<div className="grid grid-cols-3 gap-8">
{[
{
icon: 'fa-laptop-code',
title: 'Open Source Development',
description: 'Contributing to community projects and maintaining several popular npm packages'
},
{
icon: 'fa-mountain',
title: 'Mountain Climbing',
description: 'Conquered 12 peaks above 14,000 feet in the past two years'
},
{
icon: 'fa-camera',
title: 'Photography',
description: 'Specializing in landscape and architectural photography'
},
{
icon: 'fa-book',
title: 'Technical Writing',
description: 'Published author of "Modern Web Architecture" and regular blog contributor'
},
{
icon: 'fa-robot',
title: 'AI & Machine Learning',
description: 'Exploring applications of AI in software development'
},
{
icon: 'fa-chess',
title: 'Strategic Gaming',
description: 'Rated 2100+ in chess and active in local tournaments'
}
].map((interest, index) => (
<div key={index} className={`rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
<i className={`fas ${interest.icon} text-4xl text-indigo-600 mb-4`}></i>
<h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{interest.title}</h3>
<p className={`transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{interest.description}</p>
</div>
))}
</div>
</section>
{/* Education Section */}
<section id="education" className="py-20">
<h2 className={`text-3xl font-bold mb-12 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Educational Background</h2>
<div className="space-y-12">
{[
{
institution: 'Stanford University',
degree: 'Master of Science in Computer Science',
years: '2015 - 2017',
achievements: 'Specialized in Artificial Intelligence and Machine Learning. Graduate Research Assistant in the Natural Language Processing Lab.'
},
{
institution: 'University of California, Berkeley',
degree: 'Bachelor of Science in Computer Science',
years: '2011 - 2015',
achievements: 'Graduated with Honors. President of the Computer Science Society. Dean\'s List all semesters.'
}
].map((edu, index) => (
<div key={index} className={`rounded-lg shadow-sm p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<div className="flex items-start">
<div className="flex-grow">
<h3 className={`text-xl font-semibold transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{edu.institution}</h3>
<p className={`font-medium mt-1 transition-colors duration-300 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{edu.degree}</p>
<p className={`mt-1 transition-colors duration-300 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{edu.years}</p>
<p className={`mt-4 transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{edu.achievements}</p>
</div>
</div>
</div>
))}
</div>
</section>
{/* Experience Section */}
<section id="experience" className="py-20">
<h2 className={`text-3xl font-bold mb-12 transition-colors duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Professional Experience</h2>
<div className="space-y-12">
{[
{
company: 'Google',
position: 'Senior Software Engineer',
period: '2020 - Present',
responsibilities: [
'Lead a team of 8 engineers developing cloud-native applications',
'Architected and implemented microservices handling 1M+ requests per day',
'Reduced system latency by 40% through optimization and caching strategies'
]
},
{
company: 'Microsoft',
position: 'Software Engineer',
period: '2017 - 2020',
responsibilities: [
'Developed features for Azure Cloud Services used by Fortune 500 companies',
'Implemented CI/CD pipelines reducing deployment time by 60%',
'Mentored junior developers and led technical training sessions'
]
}
].map((exp, index) => (
<div key={index} className={`rounded-lg shadow-sm p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
<h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
<p className="text-indigo-600 font-medium mt-1">{exp.position}</p>
<p className="text-gray-500 mt-1">{exp.period}</p>
<ul className="mt-4 space-y-2">
{exp.responsibilities.map((resp, idx) => (
<li key={idx} className={`flex items-start transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
<i className="fas fa-check-circle text-indigo-600 mt-1 mr-2"></i>
<span>{resp}</span>
</li>
))}
</ul>
</div>
))}
</div>
</section>
</div>
{/* Back to Top Button */}
{showBackToTop && (
<button
onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-300 cursor-pointer !rounded-button"
>
<i className="fas fa-arrow-up"></i>
</button>
)}
</div>
);
};
export default App


<div className='about2 sm:flex sm:gap-6 lg:flex justify-between capitalize lg:flex-row sm:flex-col'>
              <p className='about3 font-semibold w-[45vw]'>
                I am Sumit Sonar, Currently I am studying BCA in Manipal University Jaipur. <br /><br />
                and i am an admin of my college group, i have tried to teach also whatever i can - College studies and coding to my friends only.  <br /><br />
              
                I wanted to make games, and i am very much interested in it. but Currently i am building websites and applications along with learning game development. <br /><br />
                While I strive to be serious, I naturally have a light-hearted and playful personality. I enjoy my work and bring energy to it, though I ensure that my results are always professional and meet high standards. <br /><br />
                I tend to be overly straightforward, which can sometimes come across as blunt. <br /><br />
                I value honesty deeply and never lie, which might not always align with others' expectations. <br /><br />
                i made less projects but all projects are experiments and not clones, i haven't made any clones from the start of my learning.
              </p>
            </div>