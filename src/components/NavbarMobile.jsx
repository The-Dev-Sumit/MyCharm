import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Switch from "./Switch"; 

const NavbarMobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // ✅ GSAP animation for menu opening & closing
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0, // Slide in
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "-100%", // Slide out
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* ✅ Mobile Navbar */}
      <div className="fixed top-0 left-0 w-full bg-black text-white flex justify-between items-center py-3 px-6 z-50 lg:hidden">

        {/* ✅ Hamburger Menu (Switch Component) */}
        <Switch isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
      </div>

      {/* ✅ Mobile Slide-in Menu */}
     <div
  ref={menuRef}
  className="fixed top-0 left-0 h-[60vh] w-[70%] bg-black text-white shadow-lg flex flex-col items-center justify-center space-y-6 z-40 transform -translate-x-full"
>

        {/* 🔗 Navigation Links */}
        <a href="/" className="text-xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Home</a>
        <a href="/about-me" className="text-xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>About Me</a>
        <a href="/contact-me" className="text-xl hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Contact Me</a>
      </div>

      {/* 🔳 Background Overlay (Click to Close) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavbarMobile;
