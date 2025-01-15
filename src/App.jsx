import React, {useEffect} from 'react'
import { Route, Routes } from "react-router-dom";
import './index.css'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import ContactMe from './pages/ContactMe'
import NoPage from './pages/NoPage'

const App = () => {

  useEffect(() => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.tagName === "IFRAME") {
          console.log("Iframe detected:", node);

          // Modify the sandbox attribute
          node.setAttribute("sandbox", "allow-scripts");
          console.log("Modified sandbox attribute:", node.getAttribute("sandbox"));
        }
      });
    });
  });

  // Start observing the document body
  observer.observe(document.body, { childList: true, subtree: true });

  // Cleanup
  return () => observer.disconnect();
}, []);



  return (
    <div className='bg-white w-full h-screen'>
      <div>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/contact-me" element={<ContactMe />} />
          <Route path="*" element={<NoPage/>} />
        </Routes>
    </div>
    </div>
  )
}

export default App